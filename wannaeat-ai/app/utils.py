import torch
import numpy as np
import cv2
from segment_anything import SamPredictor

# SAM 모델 로드 함수
def load_sam_model(model_path="/app/models/sam_vit_h_4b8939.pth"):
    from segment_anything import sam_model_registry
    sam = sam_model_registry["vit_h"](checkpoint=model_path)
    sam.to("cuda" if torch.cuda.is_available() else "cpu")
    return sam

# 이미지 처리 함수
def process_image(image_bytes):
    # 이미지 바이트를 OpenCV로 읽기
    nparr = np.frombuffer(image_bytes, np.uint8)
    img_cv = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # SAM 모델 초기화
    model_path = "models/sam_vit_h_4b8939.pth"
    sam = load_sam_model(model_path)

    # SAM Predictor 설정
    predictor = SamPredictor(sam)
    img = cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB)
    predictor.set_image(img)

    # 포인트 설정: 필요한 최소 포인트 수로 줄이기
    input_points = np.array([
        [img.shape[1] // 2, img.shape[0] // 2],  # 중앙
        [img.shape[1] // 4, img.shape[0] // 4],  # 상단 좌측
        [img.shape[1] // 4 * 3, img.shape[0] // 4 * 3],  # 하단 우측
    ])
    input_labels = np.array([1] * len(input_points))  # 모두 접시로 레이블링

    # 마스크 예측
    masks, _, _ = predictor.predict(point_coords=input_points, point_labels=input_labels, multimask_output=False)


    # 마스크 결합 및 외곽선 추출
    final_mask = masks[0].astype(np.uint8) * 255
    contours, _ = cv2.findContours(final_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    output_mask = np.zeros_like(final_mask, dtype=np.uint8)
    if contours:
        largest_contour = max(contours, key=cv2.contourArea)
        cv2.drawContours(output_mask, [largest_contour], -1, (1), thickness=cv2.FILLED)

    # 경계 부드럽게 처리
    output_mask = cv2.GaussianBlur(output_mask, (15, 15), 0)

    # 투명 배경 처리
    b, g, r = cv2.split(img_cv)
    alpha_channel = np.ones(b.shape, dtype=b.dtype) * 255
    alpha_channel[output_mask == 0] = 0
    rgba_image = cv2.merge((b, g, r, alpha_channel))

    # 채도 및 명도 조정
    rgba_image_rgb = cv2.cvtColor(rgba_image[:, :, :3], cv2.COLOR_RGBA2RGB)
    enhanced_image = adjust_saturation_and_brightness(rgba_image_rgb)
    rgba_image[:, :, :3] = cv2.cvtColor(enhanced_image, cv2.COLOR_RGB2RGBA)[:, :, :3]

    # 배경과 합성
    return composite_image(rgba_image)

# 채도 및 명도 조정 함수
def adjust_saturation_and_brightness(image, saturation_scale=1.3, brightness_scale=1.2):
    hsv = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)
    hsv[:, :, 1] = np.clip(hsv[:, :, 1] * saturation_scale, 0, 255)
    hsv[:, :, 2] = np.clip(hsv[:, :, 2] * brightness_scale, 0, 255)
    return cv2.cvtColor(hsv, cv2.COLOR_HSV2RGB)

# 이미지 배경과 합성하는 함수
def composite_image(rgba_image):
    background_image_path = "/app/images/background.jpg"
    background_image = cv2.imread(background_image_path)

    if background_image is None:
        raise Exception(f"배경 이미지를 불러올 수 없습니다: {background_image_path}")

    background_resized = cv2.resize(background_image, (1000, 1000))
    background_blurred = cv2.GaussianBlur(background_resized, (11, 11), 5)

    # 음식 이미지를 900px로 맞추고 비율 유지
    desired_width = 900
    aspect_ratio = rgba_image.shape[0] / rgba_image.shape[1]
    new_height = int(desired_width * aspect_ratio)
    resized_rgba_image = cv2.resize(rgba_image, (desired_width, new_height))

    # 음식 이미지를 배경의 좌측 하단에 배치
    x_offset, y_offset = 2, background_blurred.shape[0] - resized_rgba_image.shape[0] - 2
    for c in range(0, 3):
        background_blurred[y_offset:y_offset + resized_rgba_image.shape[0], x_offset:x_offset + resized_rgba_image.shape[1], c] = (
            resized_rgba_image[:, :, c] * (resized_rgba_image[:, :, 3] / 255.0) +
            background_blurred[y_offset:y_offset + resized_rgba_image.shape[0], x_offset:x_offset + resized_rgba_image.shape[1], c] * (1 - resized_rgba_image[:, :, 3] / 255.0)
        )
    
    return background_blurred
