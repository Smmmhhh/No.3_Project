/* 시도 테이블 */
CREATE TABLE sidotbl
(
    sidoID number PRIMARY KEY,
    sidoName varchar2(20) NOT NULL
);

CREATE SEQUENCE sidotbl_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;

/* 시군 테이블 */
CREATE TABLE sigungutbl
(
    siggID number PRIMARY KEY,
    sidoID number REFERENCES sidotbl (sidoID) NOT NULL,
    siggName varchar2(20) NOT NULL
);

CREATE SEQUENCE sigungutbl_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;

/* 도시 테이블 */
CREATE TABLE towntbl
(
    townID number PRIMARY KEY,
    siggID number REFERENCES sigungutbl (siggID) NOT NULL,
    townName varchar2(20) NOT NULL,
    townTarget number NOT NULL
);

CREATE SEQUENCE towntbl_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;

/* 회원 테이블 */
CREATE TABLE usertbl
(
    userNo number PRIMARY KEY,
    userID varchar2(20) UNIQUE NOT NULL,
    userAddress number REFERENCES towntbl(townID) NOT NULL,
    userPW varchar2(20) NOT NULL,
    userName varchar2(10) NOT NULL,
    userNickname varchar2(20) NOT NULL,
    userPhoneNo varchar2(20),
    userValidity number NOT NULL
);

CREATE SEQUENCE usertbl_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;

/* 카테고리 테이블 */
CREATE TABLE ctgtbl
(
    ctgID number PRIMARY KEY,
    ctgName varchar2(20) NOT NULL
);

CREATE SEQUENCE ctgtbl_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;

/* 상품 게시글 테이블 */
CREATE TABLE productPosttbl
(
    postID number PRIMARY KEY,
    ctgID number REFERENCES ctgtbl(ctgID) NOT NULL,
    userNo number REFERENCES usertbl(userNo) NOT NULL,
    townID number REFERENCES towntbl(townID) NOT NULL,
    title varchar2(20) NOT NULL,
    price number NOT NULL,
    details varchar2(200) NOT NULL,
    image varchar2(30),
    productStatus number NOT NULL
);

CREATE SEQUENCE productPosttbl_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;

/* 거래완료 테이블 */
CREATE TABLE purchaseComptbl
(
    purchaseCompID number PRIMARY KEY,
    postID number REFERENCES productPosttbl(postID) NOT NULL,
    buyerNo number REFERENCES usertbl(userNo) NOT NULL,
    purchaseCompDate date default sysdate
);

CREATE SEQUENCE purchaseComptbl_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;

/* 찜 테이블 */
CREATE TABLE liketbl
(
    likeID number PRIMARY KEY,
    postID number REFERENCES productPosttbl (postID) NOT NULL,
    userNo number REFERENCES usertbl (userNo) NOT NULL
);

CREATE SEQUENCE liketbl_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;


/* 채팅방 테이블 */
CREATE TABLE chatroomtbl
(
    roomID number PRIMARY KEY,
    postID number NOT NULL,
    buyerNo number REFERENCES usertbl (userNo) NOT NULL,
    creationDate date default sysdate,
    deleteValidity number NOT NULL
);

CREATE SEQUENCE chatroomtbl_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;

/* 메시지 테이블 */
CREATE TABLE messagetbl
(
    messageID number PRIMARY KEY,
    roomID REFERENCES chatroomtbl (roomID) NOT NULL,
    userNo REFERENCES usertbl (userNo) NOT NULL,
    message varchar2(100),
    creationDate date default sysdate,
    readValidity number NOT NULL,
    deleteValidity number NOT NULL
);

CREATE SEQUENCE messagetbl_seq
START WITH 1
INCREMENT BY 1
NOMAXVALUE;