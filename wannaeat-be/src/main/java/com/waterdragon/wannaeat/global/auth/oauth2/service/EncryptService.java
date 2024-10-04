package com.waterdragon.wannaeat.global.auth.oauth2.service;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

import org.springframework.security.crypto.encrypt.AesBytesEncryptor;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EncryptService {

	private final AesBytesEncryptor encryptor;

	// 암호화
	public String encryptData(String data) {
		byte[] encrypt = encryptor.encrypt(data.getBytes(StandardCharsets.UTF_8));
		return byteArrayToString(encrypt);
	}

	// 복호화
	public String decryptData(String data) {
		byte[] decryptBytes = stringToByteArray(data);
		byte[] decrypt = encryptor.decrypt(decryptBytes);
		return new String(decrypt, StandardCharsets.UTF_8);
	}

	// byte -> String
	public String byteArrayToString(byte[] bytes) {
		StringBuilder sb = new StringBuilder();
		for (byte abyte : bytes) {
			sb.append(abyte);
			sb.append(" ");
		}
		return sb.toString();
	}

	// String -> byte
	public byte[] stringToByteArray(String byteString) {
		String[] split = byteString.split("\\s");
		ByteBuffer buffer = ByteBuffer.allocate(split.length);
		for (String s : split) {
			buffer.put((byte)Integer.parseInt(s));
		}
		return buffer.array();
	}
}