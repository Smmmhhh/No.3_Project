/*SELECT  'DROP TABLE ' || object_name || ' CASCADE CONSTRAINTS;'
FROM    user_objects
WHERE   object_type = 'TABLE';
 */

DROP TABLE MESSAGETBL CASCADE CONSTRAINTS;
DROP TABLE CHATROOMTBL CASCADE CONSTRAINTS;
DROP TABLE LIKETBL CASCADE CONSTRAINTS;
DROP TABLE PURCHASECOMPTBL CASCADE CONSTRAINTS;
DROP TABLE PRODUCTPOSTTBL CASCADE CONSTRAINTS;
DROP TABLE CTGTBL CASCADE CONSTRAINTS;
DROP TABLE USERTBL CASCADE CONSTRAINTS;
DROP TABLE ADDRESSTBL CASCADE CONSTRAINTS;

/*
SELECT  'DROP SEQUENCE ' || object_name || ';'
FROM    user_objects
WHERE   object_type = 'SEQUENCE';
*/

DROP SEQUENCE MESSAGETBL_SEQ;
DROP SEQUENCE CHATROOMTBL_SEQ;
DROP SEQUENCE LIKETBL_SEQ;
DROP SEQUENCE PURCHASECOMPTBL_SEQ;
DROP SEQUENCE PRODUCTPOSTTBL_SEQ;
DROP SEQUENCE CTGTBL_SEQ;
DROP SEQUENCE USERTBL_SEQ;
DROP SEQUENCE ADDRESSTBL_SEQ;

/* 주소 테이블 */
CREATE TABLE addresstbl
(
    addressID number PRIMARY KEY,
    sido varchar(40) NOT NULL,
    sigungu varchar(40) NOT NULL,
    town varchar(40) NOT NULL,
    latitude number,
    longitude number
);

CREATE SEQUENCE addresstbl_seq
    START WITH 1
    INCREMENT BY 1
    NOMAXVALUE;

/* 회원 테이블 */
CREATE TABLE usertbl
(
    userNo number PRIMARY KEY,
    userID varchar2(40) UNIQUE NOT NULL,
    userAddress number REFERENCES addresstbl(addressID) NOT NULL,
    userPW varchar2(20) NOT NULL,
    userName varchar2(30) NOT NULL,
    userNickname varchar2(30) NOT NULL,
    userPhoneNo varchar2(20),
    userGrade varchar2(10),
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
    addressID number REFERENCES addresstbl(addressID) NOT NULL,
    title varchar2(100) NOT NULL,
    price number NOT NULL,
    details varchar2(500) NOT NULL,
    image varchar2(600),
    creationDate date default sysdate,
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

commit;