# 베이스 이미지
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사
COPY package.json ./
COPY package-lock.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 애플리케이션 실행
CMD ["npm", "start"]
