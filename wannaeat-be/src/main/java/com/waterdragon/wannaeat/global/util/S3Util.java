package com.waterdragon.wannaeat.global.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.waterdragon.wannaeat.global.exception.error.FileRemoveFailureException;
import com.waterdragon.wannaeat.global.exception.error.FileUploadFailureException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Util {

	private final AmazonS3 amazonS3;

	@Value("${aws.s3.bucket}")
	private String bucket;

	// 허용할 파일 확장자 목록
	private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "gif");

	// 최대 파일 크기 (예: 10MB)
	private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

	// 파일 업로드 메서드
	public String uploadFile(MultipartFile file) {
		validateFile(file);

		String fileName = generateFileName(file);

		try {
			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentType(file.getContentType());
			metadata.setContentLength(file.getSize());

			amazonS3.putObject(bucket, fileName, file.getInputStream(), metadata);
			amazonS3.setObjectAcl(bucket, fileName, CannedAccessControlList.PublicRead);
		} catch (Exception e) {
			throw new FileUploadFailureException("파일 업로드 중 오류 발생");
		}

		return amazonS3.getUrl(bucket, fileName).toString();
	}

	// 파일 검증 메서드
	private void validateFile(MultipartFile file) {

		// 파일이 비어있는지 확인
		if (file.isEmpty()) {
			throw new FileUploadFailureException("파일이 비어있습니다.");
		}

		// 파일 크기 확인
		if (file.getSize() > MAX_FILE_SIZE) {
			throw new FileUploadFailureException(
				"파일 크기가 너무 큽니다. 최대 " + (MAX_FILE_SIZE / (1024 * 1024)) + "MB 까지 가능합니다.");
		}

		// 파일 확장자 확인
		String fileExtension = getFileExtension(file.getOriginalFilename());
		if (!ALLOWED_EXTENSIONS.contains(fileExtension.toLowerCase())) {
			throw new FileUploadFailureException("허용되지 않는 파일 확장자입니다. 허용 가능한 확장자: " + ALLOWED_EXTENSIONS);
		}
	}

	// 확장자 추출 메서드
	private String getFileExtension(String fileName) {
		if (fileName == null || fileName.isEmpty()) {
			return "";
		}
		return fileName.substring(fileName.lastIndexOf(".") + 1);
	}

	// 파일 삭제 메서드
	public void deleteFile(String fileUrl) {
		// 파일명 추출
		String fileName = extractFileNameFromUrl(fileUrl);
		// 파일 존재 여부 확인
		if (!amazonS3.doesObjectExist(bucket, fileName)) {
			throw new FileRemoveFailureException("파일이 존재하지 않습니다.");
		}
		try {
			// 파일 삭제
			amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
		} catch (AmazonS3Exception e) {
			throw new FileRemoveFailureException("S3 파일 삭제 중 오류 발생");
		} catch (Exception e) {
			throw new FileRemoveFailureException("파일 삭제 중 오류 발생");
		}
	}

	// 고유한 파일 이름 생성
	private String generateFileName(MultipartFile file) {
		return UUID.randomUUID().toString() + "-" + file.getOriginalFilename().replace(" ", "_");
	}

	// 파일명 추출 메서드
	private String extractFileNameFromUrl(String fileUrl) {
		try {
			return URLDecoder.decode(fileUrl.substring(fileUrl.lastIndexOf("/") + 1), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			throw new FileRemoveFailureException("파일명 디코딩 실패");
		}
	}
}