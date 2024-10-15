# 👨🏻‍🍳 소상공인을 위한 식당 무인 운영 앱 👨🏻‍🍳


![image](https://github.com/user-attachments/assets/f6562e85-45e3-4024-803c-868151a60948)


- **배포 URL : https://j11b302.p.ssafy.io**

<br>

# 목차

1. [프로젝트 개요](#item-one)
2. [팀원 소개](#item-two)
3. [기획 배경 및 목표](#item-seven)
4. [서비스 주요 기능](#item-eight)
5. [서비스 아키텍쳐](#item-three)
6. [기술 스택](#item-four)
7. [개발 환경](#item-five)
8. [디렉토리 구조](#item-six)

<br>

<a id="item-one"></a>

# 프로젝트 개요

- **소상공인을 위한 식당 무인 운영 앱**
- 개발 기간: 2024.08.19 ~ 2024.10.11 (7주)
- 삼성 청년 소프트웨어 아카데미(SSAFY) 특화 프로젝트


<br>

<a id="item-two"></a>

# 팀원 소개

<table>
  <tr>
    <th>장정현</th>
    <th>곽예빈</th>
    <th>이경곤</th>
    <th>이수민</th>
    <th>박소정</th>
    <th>이정현</th>
  </tr>
  <tr>
    <td><img src="/uploads/73332892ccfb15155635b8126064f814/image.png" width="120" height="120"></td>
    <td><img src="/uploads/7cd97476b00fc2b8561ef0b81c2692f3/image.png" width="120" height="120"></td>
    <td><img src="/uploads/865c8847d21e605e02d8387ee4051f2a/image.png" width="120" height="120"></td>
    <td><img src="/uploads/7486323ba58f29426659c91093f88ea6/image.png" width="120" height="120"></td>
    <td><img src="/uploads/f32576199ea8275a1677bfcdd45527fc/image.png" width="120" height="120"></td>
    <td><img src="/uploads/edfb7fb5763ceb8122fb5905f7411f20/image.png" width="120" height="120"></td>
  </tr>
</table>


**🐯 장정현 : 팀장, Infra**

**🦁 곽예빈 : Back-end Leader**

**🐼 이경곤 : Back-end**

**🐰 이수민: Front-end Leader**

**🐹 박소정 : Front-end**

**🐻 이정현 : Front-end**

<br>

<a id="item-three"></a>

# 기획 배경 및 목표

### 기획 배경
[손님]    
- 단체 메뉴 주문 시, 상호 간 주문 현황 파악 어려움
- 특별한 날 예약 방문을 했는데 불편한 자리에 앉음
- 대화없이 밥만 먹고 오고 싶은 내향인 비율 증가

[사업자]
- 키오스크 구입 및 대여 비용이 부담스러움
- 높은 인건비 문제
- 피크타임에 예약, 주문, 결제를 수동으로 처리하기 바쁨.

**일행들과 함께 예약부터 주문, 결제까지 할 수 있는 서비스가 필요!**

### 기대효과
**1. 사용자 편의성 개선**         
한 곳에서 실시간 주문 현황 공유와 채팅 서비스를 제공하여 사용자 편의성을 개선하고, 예약자의 부담을 줄여줍니다.

**2. 고객 경험 향상**      
맞춤형 예약을 통해 원하는 시간, 자리에서 바로 식사가 가능합니다.   
효율적인 프로세스로 사업자의 수고는 줄이고, 고객 경험은 향상됩니다. 

**3. 시간 절약**    
핸드폰으로 간편한 결제와  퇴실, 정산이 가능합니다.   
사업자와 고객 모두의 시간을 절약해 줍니다.   

**4. 효율적인 매장 운영**    
매장 현황 파악과 예약 관리를 한 곳에서 제공하여 효율적인 매장 운영이 가능합니다.    

**5. 비용 절감**    
주문 프로세스 간소화를 통해 인건비와 키오스크 대여 비용을 절약합니다.   

**6. 운영 최적화**    
매장 맞춤형 통계를 제공하여 좌석 및 메뉴 최적화를 통한 운영 개선이 가능합니다.   
<br>

<a id="item-seven"></a>

# 서비스 주요 기능

![image](https://github.com/user-attachments/assets/595b28da-626d-4df3-b0d8-a5ac063b1727)

# 서비스 아키텍쳐
![image](https://github.com/user-attachments/assets/b466fe13-a9bd-4ea9-8db6-8430df24b43e)
<br>

<a id="item-four"></a>

# 기술 스택


### 💡 Front-end
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### 🔎 Back-end

<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">

![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=Spring-Security&logoColor=white) 
<img src="https://img.shields.io/badge/OAuth2-113155?style=for-the-badge">
<img src="https://img.shields.io/badge/QueryDSL-50ABF1?style=for-the-badge"> 
 <img src="https://img.shields.io/badge/Spring Data JPA-F8DC75?style=for-the-badge">
 ![Apache Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=Apache-Kafka&logoColor=white)
### 💾 DB

![mysql](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### 🏗 Infra

![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white)

<img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white"><img src="https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=Amazon%20S3&logoColor=white"> ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white">


<br>

<a id="item-five"></a>

# 서비스 화면

### 메인       
<img src="https://github.com/user-attachments/assets/21ec9e42-ba24-443a-8ae7-e65e371783f7" width="150px">

### 회원가입
<img src="https://github.com/user-attachments/assets/c537a7be-a1ac-4042-ac7b-663b1cf38635" width="150px">


### 소비자 페이지
<img src="https://github.com/user-attachments/assets/4fc852fa-d087-484c-9ba3-e89dc6cfd5f4" width="150px">
<img src="https://github.com/user-attachments/assets/ab3e5208-89be-4548-96e4-19edb86997d2" width="150px">

### 소비자 예약
<img src="https://github.com/user-attachments/assets/17c2daff-77ea-43df-898b-e2f3c6ef3bf6" width="150px">
<img src="https://github.com/user-attachments/assets/2c7cacb0-3ee1-4448-94ad-de535a4733fb" width="150px">
<img src="https://github.com/user-attachments/assets/45560db7-15c3-4fd0-83ca-2c37ce374f2f" width="150px">
<img src="https://github.com/user-attachments/assets/fa1f6eee-49a8-4ef4-9ddf-2d4efd1b0b2c" width="150px">
<img src="https://github.com/user-attachments/assets/b13cb86f-4f25-49a5-9492-12850bae6d13" width="150px">

# 개발 환경

### ⚙ Management Tool

- 형상 관리 : [**GitLab**](https://lab.ssafy.com/s11-fintech-finance-sub1/S11P21B302)
- 이슈 관리 : [**Jira**](https://ssafy.atlassian.net/jira/software/c/projects/S11P21B302/boards/7268)
- 디자인 : [**Figma**](https://www.figma.com/design/BrBuWz0hqMhEoj3P7te18M/%ED%85%8C%EC%9D%B4%EB%B8%94-%ED%8E%98%EC%9D%B4?node-id=229-3571&t=0BVg39wPm3Y9LXpj-1)

### 💻 IDE

- Visual Studio Code
- IntelliJ IDEA

### 💡 Front-end

- React `18.3.1`
- Axios `1.7.2`

### 🔎 Back-end

- Spring Boot `3.3.2`
- Java `Open JDK 17 - LTS`
- MySQL `8.0.37`
- Redis `3.0.5`
- MongoDB `7.0.12`

### 🏗 Infra

- Ubuntu `20.04.6 LTS`
- Docker `27.1.1`
- Docker-compose `1.25.0`
- Jenkins `2.470`
- Nginx `1.18.0`
- AWS EC2
- AWS S3

<br>

<a id="item-six"></a>

# 디렉토리 구조

<details>
<summary>Front-end</summary>
<div markdown="1">

```
추후 공개
```

</div>
</details>

<details>
<summary>Back-end</summary>
<div markdown="1">


```
추후 공개
```
</div>
</details>

<br>

<a id="item-six"></a>

