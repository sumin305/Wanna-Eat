package com.waterdragon.wannaeat.global.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.springframework.stereotype.Component;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

@Component
public class QrUtil {
	public Object generateQR(String url) throws WriterException, IOException {
		//qr 크기 설정
		int width = 200;
		int height = 200;

		// QR Code - BitMatrix: qr code 정보 생성
		BitMatrix bitMatrix = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, width, height);

		try (ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			MatrixToImageWriter.writeToStream(bitMatrix, "PNG", out);
			return out.toByteArray();
		}

	}
}
