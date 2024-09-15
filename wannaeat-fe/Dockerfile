# Node.js 20 버전 사용
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 작업 디렉토리에 복사
COPY package.json ./
COPY yarn.lock ./

# 의존성 설치
RUN yarn install

# 애플리케이션 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN yarn build

# 컨테이너가 사용하는 포트 설정
EXPOSE 3000

# 애플리케이션 시작 명령
CMD ["yarn", "start"]