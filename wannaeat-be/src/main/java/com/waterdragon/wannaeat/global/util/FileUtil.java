package com.waterdragon.wannaeat.global.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class FileUtil {

	@Value("${file.upload-dir}")
	private String uploadDir;
	private final String separator = File.separator;

	public String saveFile(MultipartFile file, String path) throws IOException {
		if (file.isEmpty()) {
			return null;
		}
		String originalFilename = file.getOriginalFilename();
		String fileExtension = originalFilename.substring(originalFilename.lastIndexOf('.'));
		String savedFileName = UUID.randomUUID() + fileExtension;
		String saveFolder = uploadDir + separator + path + separator;
		File directory = new File(saveFolder);
		if (!directory.exists()) {
			directory.mkdirs();
		}
		Path filePath = Paths.get(saveFolder, savedFileName);
		Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

		return savedFileName;
	}

	public void removeFile(String path, String fileName) throws IOException {
		String filePath = uploadDir + separator + path + separator + fileName;

		// 파일 경로 생성
		File file = new File(filePath);

		// 파일이 존재하는지 확인
		if (file.exists()) {
			// 파일 삭제
			if (file.delete()) {
				log.info("파일 삭제 성공: " + file.getAbsolutePath());
			} else {
				log.error("파일 삭제 실패: " + file.getAbsolutePath());
			}
		} else {
			throw new FileNotFoundException("파일이 존재하지 않음: " + file.getAbsolutePath());
		}
	}
}
