# E-02-clone-back

# 🏕️에어비앤비 클론코딩 ✈️

# 🌎 Web Site

https://e-02-clfe.vercel.app/

<br>

---

# 🎬 시연영상

https://youtu.be/x857WQ6KLes

<br>

---

# 😎 팀원

👉 BACK-END

- 김대석 : sign / login, 비밀번호 암호화
- 시진엽 : 게시글 CRUD, 찜하기, 찜목록, 무한스크롤, 검색
- 신승규 : 댓글 CRUD, swagger

<br>
👉 FRONT-END

- 박종현 : 회원가입, 로그인, 메인페이지 :카테고리, 좋아요
- 문동환 : 상세페이지 , 글작성 페이지, 글 수정, 삭제, s3
- 김윤철 : 후기 CRUD, 별점

프론트 : https://github.com/E-02-clone/E-02-clone-front

<br>

---

# 기능 구현

👉 회원가입 및 로그인 기능 사용(소셜로그인 미사용)

👉 호스팅 기능(주소찾기 미사용)

👉 숙소 찜하기 / 찜한 숙소 모아보기

👉 카테고리별 숙소 보여주기

👉 제목 및 위치 기반 키워드 검색

👉 비밀번호 암호화, swagger를 이용한 api명세 작성

👉 letsencrypt을 사용해서 https 설정

<br>

---

# 🛠 tools

<!-- <img src="https://img.shields.io/badge/이름-색상코드?style=flat-square&logo=로고명&logoColor=로고색"/> -->

📌 BackEnd

<img src="https://img.shields.io/badge/javascript-333333?style=flat-square&logo=javascript&logoColor=yellow"/> <img src="https://img.shields.io/badge/mysql-3333ff?style=flat-square&logo=firebase&logoColor=white"/>
<img src="https://img.shields.io/badge/express-666666?style=flat-square&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-33cc00?style=flat-square&logo=Node.js&logoColor=white"/>

<img src="https://img.shields.io/badge/NPM-33cc00?style=flat-square&logo=NPM.js&logoColor=red"/> <img src="https://img.shields.io/badge/JSON WEB TOKEN-333333?style=flat-square&logo=json web token&logoColor=white"/> <img src="https://img.shields.io/badge/AWS-ffcc33?style=flat-square&logo=AWS&logoColor=white"/>
<img src="https://img.shields.io/badge/github-181717?style=flat-square&logo=github&logoColor=white"/>

<img src="https://img.shields.io/badge/sequelize-52B0E7?style=flat-square&logo=sequelize&logoColor=black"/><img src="https://img.shields.io/badge/swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black"/><img src="https://img.shields.io/badge/Let's Encrypt-003A70?style=flat-square&logo=Let's Encrypt&logoColor=black"/>

<br>

---

# API 명세서

https://pepper-balmoral-e2e.notion.site/a8fef7e7eef74c65a1f5688870ad9fdb?v=d28a6f5529014bb9803e30dfaf374a5d

---

# ERD 및 테이블 설계

![ERD 1](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/68679b9d-0f9e-488a-ab41-60df601ef788/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220825%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220825T070021Z&X-Amz-Expires=86400&X-Amz-Signature=c7d216c06f3d168441bdb465f4a9bf60702e9e76765f55576c41c29daba40caf&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

---

# 💎BE 우리가 새롭게 도전한 기술들

1. 마지막 itemkey 값을 사용하여 무한스크롤 기능

2. sequelize Op.like %를 사용하여 키워드 검색 기능

3. swagger를 사용하여 api명세 작성

4. bcryt를 사용하여 비밀번호 암호화

---

# 🤟 Trouble Shooting

1. 검색 기능 구현 시 키워드 단독으로 값이 존재해야만 검색이 가능함 '오션뷰' 검색시 '오션뷰맛집'은 검색이 안됨
   => Op.like를 사용하여 %오션뷰%를 통하 검색시 오션뷰 앞뒤로 다른 문자열이 함께 있어도 검색이 가능하게 함

2. 무한스크롤 오프셋 기능시 중복, 누락되는 데이터 발생
   => 커서기반 페이지네이션을 통해 마지막 itemkey 값을 받아 해당 key값 보다 작은 데이터들을 보내주어 중복, 누락 없는 데이터 전송이 가능함
