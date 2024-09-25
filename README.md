# 🐶 유기/임보 동물 입양 장려 플랫폼 🐱


![견직.png](/readme/견직.png)
- **배포 URL : https://i11b106.p.ssafy.io**

<br>

# 목차

1. [프로젝트 개요](#item-one)
2. [팀원 소개](#item-two)
3. [서비스 아키텍쳐](#item-three)
4. [기술 스택](#item-four)
5. [개발 환경](#item-five)
6. [디렉토리 구조](#item-six)
7. [기획 배경 및 목표](#item-seven)
8. [서비스 주요 기능](#item-eight)
9. [설계 문서](#item-nine)

<br>

<a id="item-one"></a>

# 프로젝트 개요

- **유기/임시보호 동물 입양 장려 플랫폼**
- 개발 기간: 2024.07.08 ~ 2024.08.16
- 삼성 청년 소프트웨어 아카데미(SSAFY) 공통 프로젝트


<br>

<a id="item-two"></a>

# 팀원 소개


| 이경곤                                                                 | 곽예빈                                                                    | 이승철                                                                   | 이다영                                                                   | 김재훈                                                                   | 정규영                                                                      |                                             
|---------------------------------------------------------------------|------------------------------------------------------------------------|-----------------------------------------------------------------------|-----------------------------------------------------------------------|-----------------------------------------------------------------------|--------------------------------------------------------------------------| 
| <img src="/readme/이경곤.jpg" alt='@leeggon' width="120" height="120"> | <img src="/readme/곽예빈.PNG" alt="@Yebin-Gwak" width="120" height="120"> | <img src="/readme/이승철.PNG" alt="@Aeraekun" width="120" height="120" > | <img src="/readme/이다영.PNG" alt="@2dayoung" width="120" height="120" > | <img src="/readme/김재훈.PNG" alt="@GarrryKim" width="120" height="120"> | <img src="/readme/정규영.PNG" alt="@JungGyuYeong" width="120" height="120"> |
| [@leeggon](https://github.com/leeggon)                              | [@Yebin-Gwak](https://github.com/Yebin-Gwak)                           | [@Aeraekun](https://github.com/Aeraekun)                              | [@2dayoung](https://github.com/2dayoung)                              | [@GarrryKim](https://github.com/GarrryKim)                            | [@JungGyuYeong](https://github.com/JungGyuYeong)                         

**🐼 이경곤 : 팀장, Back-end**

**🦁 곽예빈 : Back-end**

**🐯 이승철 : Infra**

**🐰 이다영 : Front-end**

**🐱 김재훈 : Front-end**

**🐮 정규영 : Front-end**

<br>

<a id="item-three"></a>

# 서비스 아키텍쳐

![아키텍처1.PNG](/readme/아키텍처1.PNG)

![아키텍처2.PNG](/readme/아키텍처2.PNG)

<br>

<a id="item-four"></a>

# 기술 스택


### 💡 Front-end
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

### 🔎 Back-end

<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">

![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=Spring-Security&logoColor=white) 
<img src="https://img.shields.io/badge/OAuth2-113155?style=for-the-badge">
<img src="https://img.shields.io/badge/QueryDSL-50ABF1?style=for-the-badge"> 
 <img src="https://img.shields.io/badge/Spring Data JPA-F8DC75?style=for-the-badge">
### 💾 DB

![mysql](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### 🏗 Infra

![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white)

<img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white"><img src="https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=Amazon%20S3&logoColor=white"> ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white">


<br>

<a id="item-five"></a>

# 개발 환경

### ⚙ Management Tool

- 형상 관리 : [**GitLab**](https://lab.ssafy.com/s11-webmobile1-sub2/S11P12B106)
- 이슈 관리 : [**Jira**](https://ssafy.atlassian.net/jira/software/c/projects/S11P12B106/boards/6989/timeline)
- 커뮤니케이션 : Mattermost, [**Notion**](https://violet-chocolate-38b.notion.site/1-B106-05f8ebd301d743f09954b296abbe67b2?pvs=4)
- 디자인 : [**Figma**](https://www.figma.com/design/owgNGh5aqpVMCSRlrj55u1/B106-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0-1&t=qWFFCXsR9TmzkYUY-0), [**Google Slides**](https://docs.google.com/presentation/d/1H4gH4S2IEhLtv3xQTALmcKLCarNHXOriR3UzswWHek0/edit#slide=id.p)

### 💻 IDE

- Visual Studio Code
- IntelliJ IDEA community

### 💡 Front-end

- React `18.3.1`
- Node.js `20.15.0`
- Axios `1.7.2`
- Redux `9.1.2`
- Tailwindcss `3.4.6`

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
📦src
 ┣ 📂api
 ┃ ┣ 📜animals-api.js
 ┃ ┣ 📜axios-instance.js
 ┃ ┣ 📜boards-api.js
 ┃ ┣ 📜chat-api.js
 ┃ ┣ 📜contracts-api.js
 ┃ ┣ 📜mypage-api.js
 ┃ ┣ 📜petpicks-api.js
 ┃ ┗ 📜users-api.js
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜Pretendard-Bold.otf
 ┃ ┃ ┣ 📜Pretendard-Light.otf
 ┃ ┃ ┣ 📜Pretendard-Medium.otf
 ┃ ┃ ┗ 📜Pretendard-Regular.otf
 ┃ ┣ 📂icons
 ┃ ┃ ┣ 📜icon-call-facetime.svg
 ┃ ┃ ┣ 📜icon-chat-add.svg
 ┃ ┃ ┣ 📜icon-chat.svg
 ┃ ┃ ┣ 📜icon-close.svg
 ┃ ┃ ┣ 📜icon-cursor.png
 ┃ ┃ ┣ 📜icon-default-user-150.svg
 ┃ ┃ ┣ 📜icon-follow.svg
 ┃ ┃ ┣ 📜icon-goBack.svg
 ┃ ┃ ┣ 📜icon-loading.svg
 ┃ ┃ ┣ 📜icon-login-google.png
 ┃ ┃ ┣ 📜icon-login-google.svg
 ┃ ┃ ┣ 📜icon-login-kakao.png
 ┃ ┃ ┣ 📜icon-login-naver.png
 ┃ ┃ ┣ 📜icon-login-naver2.png
 ┃ ┃ ┣ 📜icon-login.svg
 ┃ ┃ ┣ 📜icon-minimize.svg
 ┃ ┃ ┣ 📜icon-my-articles.svg
 ┃ ┃ ┣ 📜icon-my-contracts.svg
 ┃ ┃ ┣ 📜icon-my-favorites.svg
 ┃ ┃ ┣ 📜icon-my-likes.svg
 ┃ ┃ ┣ 📜icon-my-pets.svg
 ┃ ┃ ┣ 📜icon-my-shorts.svg
 ┃ ┃ ┣ 📜icon-pawprint.png
 ┃ ┃ ┣ 📜icon-play.png
 ┃ ┃ ┣ 📜icon-scrolldown.gif
 ┃ ┃ ┣ 📜icon-search.png
 ┃ ┃ ┣ 📜icon-search.svg
 ┃ ┃ ┣ 📜icon-send-message.svg
 ┃ ┃ ┣ 📜icon-siren-white.svg
 ┃ ┃ ┣ 📜icon-siren.svg
 ┃ ┃ ┣ 📜icon-stop.png
 ┃ ┃ ┣ 📜icon-trashbin.png
 ┃ ┃ ┗ 📜Siren.svg
 ┃ ┣ 📂image
 ┃ ┃ ┣ 📜ai.jpg
 ┃ ┃ ┣ 📜Comment.png
 ┃ ┃ ┣ 📜contract-background.webp
 ┃ ┃ ┣ 📜contract-bg.webp
 ┃ ┃ ┣ 📜default_user_150.png
 ┃ ┃ ┣ 📜dog.png
 ┃ ┃ ┣ 📜Female.png
 ┃ ┃ ┣ 📜follow-white.png
 ┃ ┃ ┣ 📜Follow.png
 ┃ ┃ ┣ 📜Like.png
 ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┣ 📜Mainslide.png
 ┃ ┃ ┣ 📜Mainslide1.png
 ┃ ┃ ┣ 📜Mainslide2.jpg
 ┃ ┃ ┣ 📜Male.png
 ┃ ┃ ┣ 📜marker.png
 ┃ ┃ ┣ 📜pet.png
 ┃ ┃ ┣ 📜profile.JPG
 ┃ ┃ ┣ 📜Select.png
 ┃ ┃ ┣ 📜Share.png
 ┃ ┃ ┣ 📜Siren-white.png
 ┃ ┃ ┣ 📜Siren.png
 ┃ ┃ ┣ 📜Tag.png
 ┃ ┃ ┣ 📜UnLike.png
 ┃ ┃ ┣ 📜산책러버.png
 ┃ ┃ ┣ 📜애정 듬뿍러.png
 ┃ ┃ ┣ 📜쿨한 독립러.png
 ┃ ┃ ┣ 📜편안한 소울메이트.png
 ┃ ┃ ┗ 📜함께하는 베프.png
 ┃ ┣ 📂petpick
 ┃ ┃ ┣ 📜main1.mp4
 ┃ ┃ ┣ 📜main2.mp4
 ┃ ┃ ┗ 📜main3.mp4
 ┃ ┗ 📂ucc
 ┃ ┃ ┗ 📜ucc.mp4
 ┣ 📂components
 ┃ ┣ 📂board
 ┃ ┃ ┣ 📂animals
 ┃ ┃ ┃ ┣ 📜AnimalAPIBoardLIst.jsx
 ┃ ┃ ┃ ┣ 📜AnimalBoardList.jsx
 ┃ ┃ ┃ ┣ 📜animaldata.jsx
 ┃ ┃ ┃ ┣ 📜AnimalDetail.jsx
 ┃ ┃ ┃ ┣ 📜AnimalDetailModify.jsx
 ┃ ┃ ┃ ┣ 📜AnimalDetailProfile.jsx
 ┃ ┃ ┃ ┣ 📜AnimalItem.jsx
 ┃ ┃ ┃ ┣ 📜AnimalRegist.jsx
 ┃ ┃ ┃ ┗ 📜AnimalSearchForm.jsx
 ┃ ┃ ┗ 📂articles
 ┃ ┃ ┃ ┣ 📜ArticleBoardList.jsx
 ┃ ┃ ┃ ┣ 📜ArticleBoardWrite.jsx
 ┃ ┃ ┃ ┣ 📜ArticleComments.jsx
 ┃ ┃ ┃ ┣ 📜articledata.jsx
 ┃ ┃ ┃ ┣ 📜ArticleDetail.jsx
 ┃ ┃ ┃ ┣ 📜ArticleDetailModify.jsx
 ┃ ┃ ┃ ┣ 📜ArticleItem.jsx
 ┃ ┃ ┃ ┗ 📜Search.jsx
 ┃ ┣ 📂chat
 ┃ ┃ ┣ 📜CallPage copy.jsx
 ┃ ┃ ┣ 📜CallPage.jsx
 ┃ ┃ ┣ 📜ChatListContainer.jsx
 ┃ ┃ ┣ 📜ChatListItem.jsx
 ┃ ┃ ┣ 📜ChatMainContainer.jsx
 ┃ ┃ ┣ 📜MessageItem.jsx
 ┃ ┃ ┣ 📜OvVideo.js
 ┃ ┃ ┣ 📜UserVideo.css
 ┃ ┃ ┗ 📜UserVideoComponent.js
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜AnimalProfile.jsx
 ┃ ┃ ┣ 📜AnimalTag.jsx
 ┃ ┃ ┣ 📜ArticleTag.jsx
 ┃ ┃ ┣ 📜Button.jsx
 ┃ ┃ ┣ 📜Comment.jsx
 ┃ ┃ ┣ 📜CommentIcon.jsx
 ┃ ┃ ┣ 📜DeleteConfirmationModal.jsx
 ┃ ┃ ┣ 📜Editor.jsx
 ┃ ┃ ┣ 📜FollowButton.jsx
 ┃ ┃ ┣ 📜FollowIcon.jsx
 ┃ ┃ ┣ 📜Input.jsx
 ┃ ┃ ┣ 📜LikeIcon.jsx
 ┃ ┃ ┣ 📜LoginModalComponent.jsx
 ┃ ┃ ┣ 📜OpenPopover.jsx
 ┃ ┃ ┣ 📜OptionIcon.jsx
 ┃ ┃ ┣ 📜Pagination.jsx
 ┃ ┃ ┣ 📜Popover.jsx
 ┃ ┃ ┣ 📜Profile.jsx
 ┃ ┃ ┣ 📜ProfileForAnimal.jsx
 ┃ ┃ ┣ 📜SearchDropDown.jsx
 ┃ ┃ ┣ 📜SearchDropDownChat.jsx
 ┃ ┃ ┣ 📜ShareIcon.jsx
 ┃ ┃ ┣ 📜SirenButton.jsx
 ┃ ┃ ┣ 📜SirenIcon.jsx
 ┃ ┃ ┣ 📜SirenModal.jsx
 ┃ ┃ ┣ 📜SirenWhiteIcon.jsx
 ┃ ┃ ┣ 📜StateBadge.jsx
 ┃ ┃ ┣ 📜StateColorList.jsx
 ┃ ┃ ┣ 📜TagIcon.jsx
 ┃ ┃ ┣ 📜Timer.jsx
 ┃ ┃ ┗ 📜TopButton.jsx
 ┃ ┣ 📂contracts
 ┃ ┃ ┣ 📜ContractAnimal.jsx
 ┃ ┃ ┣ 📜ContractDetail.jsx
 ┃ ┃ ┣ 📜ContractPerson.jsx
 ┃ ┃ ┣ 📜ContractsContainer.jsx
 ┃ ┃ ┣ 📜ContractsCreateContainer.jsx
 ┃ ┃ ┗ 📜ContractStamp.jsx
 ┃ ┣ 📂header
 ┃ ┃ ┣ 📜NavAction.jsx
 ┃ ┃ ┣ 📜Navbar.jsx
 ┃ ┃ ┣ 📜NavChat.jsx
 ┃ ┃ ┣ 📜NavInput.jsx
 ┃ ┃ ┣ 📜NavItemList.jsx
 ┃ ┃ ┗ 📜NavLogo.jsx
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📜MainAiComponent.jsx
 ┃ ┃ ┣ 📜MainAnimalComponent.jsx
 ┃ ┃ ┣ 📜MainArticleBanner.jsx
 ┃ ┃ ┣ 📜MainArticleComponent.jsx
 ┃ ┃ ┣ 📜MainBoardComponent.jsx
 ┃ ┃ ┣ 📜MainComponent.jsx
 ┃ ┃ ┣ 📜MainLostAndFoundComponent.jsx
 ┃ ┃ ┣ 📜MainPetpickBanner.jsx
 ┃ ┃ ┣ 📜MainPetpickComponent.jsx
 ┃ ┃ ┗ 📜MainShelterCard.jsx
 ┃ ┣ 📂map
 ┃ ┃ ┣ 📜LostAnimalMap.jsx
 ┃ ┃ ┗ 📜LostAnimalReport.jsx
 ┃ ┣ 📂my-page
 ┃ ┃ ┣ 📜AdminReport.jsx
 ┃ ┃ ┣ 📜AdminUser.jsx
 ┃ ┃ ┣ 📜MyPageAnimalsContainer.jsx
 ┃ ┃ ┣ 📜MyPageArticlesContainer.jsx
 ┃ ┃ ┣ 📜MyPageCard.jsx
 ┃ ┃ ┣ 📜MyPageContractsContainer.jsx
 ┃ ┃ ┣ 📜MyPageDisableContainer.jsx
 ┃ ┃ ┣ 📜MyPageFavoritesContainer.jsx
 ┃ ┃ ┣ 📜MyPageLikesContainer.jsx
 ┃ ┃ ┣ 📜MyPageNav.jsx
 ┃ ┃ ┣ 📜MyPageNavContainer.jsx
 ┃ ┃ ┣ 📜MyPagePetPicsContainer.jsx
 ┃ ┃ ┣ 📜MyPageReportsContainer.jsx
 ┃ ┃ ┗ 📜MyPageUsersContainer.jsx
 ┃ ┣ 📂payment
 ┃ ┃ ┣ 📜PaymentCancel.jsx
 ┃ ┃ ┣ 📜PaymentComplete.jsx
 ┃ ┃ ┗ 📜PaymentFail.jsx
 ┃ ┣ 📂petpick
 ┃ ┃ ┣ 📜AnimalAd.jsx
 ┃ ┃ ┣ 📜dummydata.jsx
 ┃ ┃ ┣ 📜PetpickComments.jsx
 ┃ ┃ ┣ 📜PetpickDetail.jsx
 ┃ ┃ ┣ 📜PetpickIconContainer.jsx
 ┃ ┃ ┣ 📜PetpickModify.jsx
 ┃ ┃ ┣ 📜PetpickVideo.jsx
 ┃ ┃ ┣ 📜PetpickWrite.jsx
 ┃ ┃ ┣ 📜TaggedAnimalItem.jsx
 ┃ ┃ ┗ 📜TaggedArticleItem.jsx
 ┃ ┣ 📂promotions
 ┃ ┃ ┗ 📜PromotionList.jsx
 ┃ ┣ 📂recommendation
 ┃ ┃ ┣ 📜ProposedBoardList.jsx
 ┃ ┃ ┣ 📜Recommendation.jsx
 ┃ ┃ ┗ 📜Recommendation2.jsx
 ┃ ┗ 📂users
 ┃ ┃ ┣ 📜Login.jsx
 ┃ ┃ ┣ 📜SignUp.jsx
 ┃ ┃ ┣ 📜SocailSuccessContainer.jsx
 ┃ ┃ ┣ 📜SocialUpdateContainer.jsx
 ┃ ┃ ┗ 📜UpdateProfileContainer.jsx
 ┣ 📂features
 ┃ ┣ 📂chat
 ┃ ┃ ┗ 📜chat-slice.js
 ┃ ┣ 📂petpick
 ┃ ┃ ┗ 📜petpick-slice.js
 ┃ ┗ 📂user
 ┃ ┃ ┗ 📜users-slice.js
 ┣ 📂layout
 ┃ ┣ 📜Layout.jsx
 ┃ ┣ 📜ShortsLayout.jsx
 ┃ ┗ 📜UsersLayout.jsx
 ┣ 📂pages
 ┃ ┣ 📜AnimalPage.jsx
 ┃ ┣ 📜BoardPage.jsx
 ┃ ┣ 📜ChatListPageTest.jsx
 ┃ ┣ 📜ChatModal.jsx
 ┃ ┣ 📜ContractsPage.jsx
 ┃ ┣ 📜LoginPage.jsx
 ┃ ┣ 📜LostAndFoundPage.jsx
 ┃ ┣ 📜MainPage.jsx
 ┃ ┣ 📜MyPage.jsx
 ┃ ┣ 📜PaymentPage.jsx
 ┃ ┣ 📜PetpickPage.jsx
 ┃ ┣ 📜PromotionPage.jsx
 ┃ ┣ 📜RecommendationPage.jsx
 ┃ ┣ 📜SignUpPage.jsx
 ┃ ┣ 📜SocialPage.jsx
 ┃ ┗ 📜UpdateProfilePage.jsx
 ┣ 📂routes
 ┃ ┗ 📜PrivateRoute.jsx
 ┣ 📂utils
 ┃ ┣ 📜chat-utils.js
 ┃ ┣ 📜common-utils.jsx
 ┃ ┣ 📜contract-utils.js
 ┃ ┣ 📜petpick-utils.js
 ┃ ┣ 📜user-utils.js
 ┃ ┗ 📜user-validations.js
 ┣ 📜App.jsx
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜registerServiceWorker.js
 ┣ 📜reportWebVitals.js
 ┣ 📜setupProxy.js
 ┣ 📜setupTests.js
 ┗ 📜store.js
```

</div>
</details>

<details>
<summary>Back-end</summary>
<div markdown="1">

 ``` 
 📦petbridge
 ┣ 📂domain
 ┃ ┣ 📂animal
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜AnimalController.java
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┗ 📜Animal.java
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┣ 📜AnimalEditRequestDto.java
 ┃ ┃ ┃ ┃ ┗ 📜AnimalRegistRequestDto.java
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┗ 📜AnimalResponseDto.java
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┣ 📜AnimalRepository.java
 ┃ ┃ ┃ ┣ 📜CustomAnimalRepository.java
 ┃ ┃ ┃ ┗ 📜CustomAnimalRepositoryImpl.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┣ 📜AnimalService.java
 ┃ ┃ ┃ ┗ 📜AnimalServiceImpl.java
 ┃ ┣ 📂authentication
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┗ 📂service
 ┃ ┣ 📂board
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜BoardController.java
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┣ 📂enums
 ┃ ┃ ┃ ┃ ┗ 📜BoardType.java
 ┃ ┃ ┃ ┗ 📜Board.java
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┣ 📜BoardEditRequestDto.java
 ┃ ┃ ┃ ┃ ┗ 📜BoardRegistRequestDto.java
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┗ 📜BoardResponseDto.java
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┣ 📜BoardRepository.java
 ┃ ┃ ┃ ┣ 📜CustomBoardRepository.java
 ┃ ┃ ┃ ┗ 📜CustomBoardRepositoryImpl.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┣ 📜BoardService.java
 ┃ ┃ ┃ ┗ 📜BoardServiceImpl.java
 ┃ ┣ 📂boardcomment
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜BoardCommentController.java
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┗ 📜BoardComment.java
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┣ 📜BoardCommentEditRequestDto.java
 ┃ ┃ ┃ ┃ ┗ 📜BoardCommentRegistRequestDto.java
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┗ 📜BoardCommentResponseDto.java
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┗ 📜BoardCommentRepository.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┣ 📜BoardCommentService.java
 ┃ ┃ ┃ ┗ 📜BoardCommentServiceImpl.java
 ┃ ┣ 📂chatmessage
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜ChatMessageController.java
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┗ 📜ChatMessage.java
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┗ 📜ChatMessageRequestDto.java
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┗ 📜ChatMessageResponseDto.java
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┗ 📜ChatMessageRepository.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┣ 📜ChatMessageService.java
 ┃ ┃ ┃ ┗ 📜ChatMessageServiceImpl.java
 ┃ ┣ 📂chatroom
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜ChatRoomController.java
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┗ 📜ChatRoom.java
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┗ 📜ChatRoomRequestDto.java
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┗ 📜ChatRoomResponseDto.java
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┗ 📜ChatRoomRepository.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┣ 📜ChatRoomService.java
 ┃ ┃ ┃ ┗ 📜ChatRoomServiceImpl.java
 ┃ ┣ 📂contract
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜ContractController.java
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┣ 📂enums
 ┃ ┃ ┃ ┃ ┗ 📜Status.java
 ┃ ┃ ┃ ┗ 📜Contract.java
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┣ 📜ContractEditRequestDto.java
 ┃ ┃ ┃ ┃ ┗ 📜ContractRequestDto.java
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┣ 📜ContractListResponseDto.java
 ┃ ┃ ┃ ┃ ┗ 📜ContractResponseDto.java
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┗ 📜ContractRepository.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┣ 📜ContractService.java
 ┃ ┃ ┃ ┗ 📜ContractServiceImpl.java
 ┃ ┣ 📂contractcheck
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜ContractCheckController.java
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┗ 📜ContractCheck.java
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┗ 📜ContractCheckRequestDto.java
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┗ 📜ContractCheckResponseDto.java
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┗ 📜ContractCheckRepository.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┣ 📜ContractCheckService.java
 ┃ ┃ ┃ ┗ 📜ContractCheckServiceImpl.java
 ┃ ┣ 📂follow
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜FollowController.java
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┗ 📜Follow.java
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┗ 📜FollowRequestDto.java
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┗ 📜FollowResponseDto.java
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┗ 📜FollowRepository.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┣ 📜FollowService.java
 ┃ ┃ ┃ ┗ 📜FollowServiceImpl.java
 ┃ ┣ 📂petpick
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜PetPickController.java
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┗ 📜PetPick.java
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┣ 📜PetPickEditRequestDto.java
 ┃ ┃ ┃ ┃ ┗ 📜PetPickRegistRequestDto.java
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┗ 📜PetPickResponseDto.java
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┗ 📜PetPickRepository.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┣ 📜PetPickService.java
 ┃ ┃ ┃ ┗ 📜PetPickServiceImpl.java
 ┃ ┣ 📂petpickcomment
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜PetPickCommentController.java
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┗ 📜PetPickComment.java
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┣ 📜PetPickCommentEditRequestDto.java
 ┃ ┃ ┃ ┃ ┗ 📜PetPickCommentRegistRequestDto.java
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┗ 📜PetPickCommentResponseDto.java
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┗ 📜PetPickCommentRepository.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┣ 📜PetPickCommentService.java
 ┃ ┃ ┃ ┗ 📜PetPickCommentServiceImpl.java
 ┃ ┣ 📂petpicklike
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜PetPickLikeController.java
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┗ 📜PetPickLike.java
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┗ 📜PetPickLikeRequestDto.java
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┗ 📜PetPickLikeResponseDto.java
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┗ 📜PetPickLikeRepository.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┣ 📜PetPickLikeService.java
 ┃ ┃ ┃ ┗ 📜PetPickLikeServiceImpl.java
 ┃ ┣ 📂report
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜ReportController.java
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┣ 📂enums
 ┃ ┃ ┃ ┃ ┗ 📜ReportType.java
 ┃ ┃ ┃ ┗ 📜Report.java
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┗ 📜ReportRegistRequestDto.java
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┗ 📜ReportResponseDto.java
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┗ 📜ReportRepository.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┣ 📜ReportService.java
 ┃ ┃ ┃ ┗ 📜ReportServiceImpl.java
 ┃ ┗ 📂user
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┣ 📜HealthCheckController.java
 ┃ ┃ ┃ ┗ 📜UserController.java
 ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┣ 📂enums
 ┃ ┃ ┃ ┃ ┣ 📜Role.java
 ┃ ┃ ┃ ┃ ┗ 📜SocialType.java
 ┃ ┃ ┃ ┗ 📜User.java
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┣ 📜EmailRequestDto.java
 ┃ ┃ ┃ ┃ ┣ 📜PhoneRequestDto.java
 ┃ ┃ ┃ ┃ ┣ 📜UserEditRequestDto.java
 ┃ ┃ ┃ ┃ ┗ 📜UserSignUpRequestDto.java
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┗ 📜UserResponseDto.java
 ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┗ 📜NotExistUserException.java
 ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┣ 📜UserCustomRepository.java
 ┃ ┃ ┃ ┣ 📜UserCustomRepositoryImpl.java
 ┃ ┃ ┃ ┗ 📜UserRepository.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┣ 📜UserService.java
 ┃ ┃ ┃ ┗ 📜UserServiceImpl.java
 ┣ 📂global
 ┃ ┣ 📂config
 ┃ ┃ ┣ 📜ChatConfig.java
 ┃ ┃ ┣ 📜MongodbConfig.java
 ┃ ┃ ┣ 📜QueryDslConfig.java
 ┃ ┃ ┣ 📜S3Config.java
 ┃ ┃ ┣ 📜SecurityConfig.java
 ┃ ┃ ┗ 📜WebConfig.java
 ┃ ┣ 📂exception
 ┃ ┃ ┣ 📜ErrorCode.java
 ┃ ┃ ┣ 📜ErrorResponse.java
 ┃ ┃ ┣ 📜GlobalExceptionHandler.java
 ┃ ┃ ┗ 📜PetBridgeException.java
 ┃ ┣ 📂jwt
 ┃ ┃ ┣ 📂filter
 ┃ ┃ ┃ ┗ 📜JwtAuthenticationProcessingFilter.java
 ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┗ 📜JwtService.java
 ┃ ┃ ┗ 📂util
 ┃ ┃ ┃ ┗ 📜PasswordUtil.java
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📂filter
 ┃ ┃ ┃ ┗ 📜CustomJsonUsernamePasswordAuthenticationFilter.java
 ┃ ┃ ┣ 📂handler
 ┃ ┃ ┃ ┣ 📜LoginFailureHandler.java
 ┃ ┃ ┃ ┗ 📜LoginSuccessHandler.java
 ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┗ 📜LoginService.java
 ┃ ┃ ┗ 📂userdetail
 ┃ ┃ ┃ ┗ 📜CustomUserDetail.java
 ┃ ┣ 📂oauth2
 ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┗ 📜DuplicateNicknameException.java
 ┃ ┃ ┣ 📂handler
 ┃ ┃ ┃ ┣ 📜OAuth2LoginFailureHandler.java
 ┃ ┃ ┃ ┗ 📜OAuth2LoginSuccessHandler.java
 ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┗ 📜CustomOAuth2UserService.java
 ┃ ┃ ┣ 📂userinfo
 ┃ ┃ ┃ ┣ 📜GoogleOAuth2UserInfo.java
 ┃ ┃ ┃ ┣ 📜KakaoOAuth2UserInfo.java
 ┃ ┃ ┃ ┣ 📜NaverOAuth2UserInfo.java
 ┃ ┃ ┃ ┗ 📜OAuth2UserInfo.java
 ┃ ┃ ┣ 📜CustomOAuth2User.java
 ┃ ┃ ┗ 📜OAuthAttributes.java
 ┃ ┣ 📂openvidu
 ┃ ┃ ┗ 📜OpenviduController.java
 ┃ ┣ 📂payment
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜PaymentController.java
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┗ 📜PaymentRequestDto.java
 ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┣ 📜ApproveResponseDto.java
 ┃ ┃ ┃ ┃ ┗ 📜ReadyResponseDto.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┣ 📜KakaoPayService.java
 ┃ ┃ ┃ ┗ 📜KakaoPayServiceImpl.java
 ┃ ┣ 📂redis
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┗ 📜RedisConfig.java
 ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┗ 📜RedisService.java
 ┃ ┣ 📂response
 ┃ ┃ ┗ 📜SuccessResponse.java
 ┃ ┗ 📂websocket
 ┣ 📂util
 ┃ ┣ 📂logback
 ┃ ┃ ┗ 📜MattermostAppender.java
 ┃ ┣ 📜AuthUtil.java
 ┃ ┣ 📜FileUtil.java
 ┃ ┗ 📜S3FileUtil.java
 ┗ 📜PetbridgeApplication.java
 ```
</div>
</details>

<br>

<a id="item-six"></a>

# 기획 배경 및 목표

### 기획 배경
- 유기동물 개체 수의 증가
- 유기동물에 대한 부정적 인식 & 입양 절차의 무지
- 임시보호자, 입양자 간 신뢰성 문제(부적합한 입양 환경, 입양 후 학대 등 문제)
- 책임비 불법 및 남용 문제

### `견우와 직묘` 목표
- 유기, 임시보호 동물 입양 **접근성** 향상
- 임시보호자, 입양자 간 **신뢰할 수 있는** 입양 절차 보장
- 책임비 중개를 통해 **건강한 입양 문화** 조성

<br>

<a id="item-seven"></a>

# 서비스 주요 기능

### 입양 공고 확인

<img src="readme/입양공고 확인.gif" alt="입양 공고 확인" width="800px">

- 보호소 동물 혹은 임시보호중인 동물들의 공고를 확인

<br>

### 실종 동물 제보

<img src="readme/실종동물 제보.gif" alt="실종동물 제보" width="800px">

- 전국 실종 동물들을 제보
- 경위도를 사용하여 실종 동물의 정확한 위치 제공
- 실종 동물의 조기 발견을 통해 유기 동물 개체 수 최소화

<br>

### 펫픽

<img src="readme/펫픽.gif" alt="펫픽" width="800px">

- 보호소 동물 및 임시보호 동물들의 숏폼 비디오 컨텐츠
- 숏폼 컨텐츠를 통해 유기동물에 대한 인식 개선 및 입양 장려
- 숏폼 3개당 1회는 위치 기반 보호소 동물들을 함께 홍보

<br>

### 집사 유형 검사

<img src="readme/집사유형검사.gif" alt="집사유형검사" width="800px">

- 사용자 성향과 환경에 최적화된 맞춤형 반려동물 품종 추천
- 해당 추천 품종 동물들의 게시글을 연동하여 입양 유도

<br>

### 입양 홍보 게시판 / 입양 후기 게시판

<img src="readme/입양 게시판.gif" alt="입양 게시판" width="800px">

- 입양 홍보를 통해 사용자의 입양 독려
- 입양 후기를 통해 유기동물 입양의 긍정적 인식 제고

<br>

### 채팅

<img src="readme/채팅.gif" alt="채팅" width="800px">

- 입양 신청을 위해, 입양자는 임시보호자와 채팅 시도

<br>

### 화상채팅

<img src="readme/화상채팅.gif" alt="화상채팅" width="800px">

- 임시보호자와 입양자의 실시간 화상채팅으로 상호 간 신뢰성 향상
- 임시보호자 : 입양자의 실제 환경을 사전 체크
- 입양자 : 입양 받을 동물의 상태를 미리 확인

<br>

### 계약서

<img src="readme/계약서1.gif" alt="계약서1" width="800px">

- 임시보호자는 입양자와 협의한 내용을 기반으로 입양 보낼 동물에 대한 계약서 작성
- 임시보호자는 계약서에 책임비, 특약사항 관련 내용 작성 후 SMS 본인 인증을 통해 서명

<br>

<img src="readme/계약서2.gif" alt="" width="800px">

- 계약서를 전달 받은 입양자는 SMS 본인 인증 서명 후 계약 체결

<br>

<img src="readme/계약서3.gif" alt="" width="800px">

- 입양자는 카카오페이 API를 활용하여 책임비 결제
- 결제가 완료되면 입양 스탬프북 생성

<br>

<img src="readme/계약서4.gif" alt="" width="800px">

- 임시보호자는 입양자가 계약서의 특약사항을 성실히 이행할 경우, 한 달에 한 번 스탬프를 찍어줄 수 있음

<br>

<img src="readme/계약서5.gif" alt="" width="800px">

- 계약 기간 동안 스탬프를 모두 성실히 모은 입양자는 책임비 환급을 신청할 수 있음

<br>

<a id="item-nine"></a>

# 설계 문서


### 요구사항 명세서

[**Google SpreadSheet**](https://docs.google.com/spreadsheets/d/10fPQWGjoIb0FMlQhBWriEXRb9Mn3Emnc065Hca7eTYI/edit?gid=0#gid=0)

![요구사항명세서.PNG](/readme/요구사항명세서.PNG)


### 와이어프레임

[**Google Slides**](https://docs.google.com/presentation/d/1H4gH4S2IEhLtv3xQTALmcKLCarNHXOriR3UzswWHek0/edit#slide=id.g2785a9263da_7_0)

![와이어프레임.PNG](/readme/와이어프레임.PNG)


### 피그마

[**Figma**](https://docs.google.com/presentation/d/1H4gH4S2IEhLtv3xQTALmcKLCarNHXOriR3UzswWHek0/edit#slide=id.g2785a9263da_7_0)

![피그마.PNG](/readme/피그마.PNG)


### ERD

[**ERD**](https://www.erdcloud.com/d/vEKDwhTZd9fnKtWA8)

![erd.png](/readme/erd.png)


### 📝 API 명세서

[**API 명세서**](https://violet-chocolate-38b.notion.site/API-Docs-145a09e708594958a41701dba986b4ea?pvs=4)

![API명세서.PNG](/readme/API명세서.PNG)
