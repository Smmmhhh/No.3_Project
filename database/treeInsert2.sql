/*
시흥동 714
가산동 212
풍납동 787
화양동 560
신림동 759
암사동 803
*/

/* 위의 주소로 adressid 변경 */
UPDATE productposttbl SET addressid = 714 WHERE postid = 1;
UPDATE productposttbl SET addressid = 212 WHERE postid = 2;
UPDATE productposttbl SET addressid = 787 WHERE postid = 3;
UPDATE productposttbl SET addressid = 560 WHERE postid = 4;
UPDATE productposttbl SET addressid = 759 WHERE postid = 5;
UPDATE productposttbl SET addressid = 803 WHERE postid = 6;
UPDATE productposttbl SET addressid = 714 WHERE postid = 7;
UPDATE productposttbl SET addressid = 212 WHERE postid = 8;
UPDATE productposttbl SET addressid = 787 WHERE postid = 9;
UPDATE productposttbl SET addressid = 560 WHERE postid = 10;
UPDATE productposttbl SET addressid = 759 WHERE postid = 11;
UPDATE productposttbl SET addressid = 803 WHERE postid = 12;



/* 테스트를 위해 userno가 1인 사람의 post로 변경 */
UPDATE productPosttbl SET userno = 1 WHERE postid = 2;
UPDATE productPosttbl SET userno = 1 WHERE postid = 3;
UPDATE productPosttbl SET userno = 1 WHERE postid = 4;


/*찜한 사람 추가*/
INSERT INTO liketbl VALUES (liketbl_seq.nextval, 5, 1); // 5번 게시물 1번이 찜
INSERT INTO liketbl VALUES (liketbl_seq.nextval, 6, 1); // 6번 게시물 1번이 찜
INSERT INTO liketbl VALUES (liketbl_seq.nextval, 7, 1); // 7번 게시물 1번이 찜


/* 채팅룸 추가 */
INSERT INTO chatroomtbl VALUES (chatroomtbl_seq.nextval, 1, 2, sysdate, 0); // 판매자 1과 구매자 2의 1번 게시물 채팅방
INSERT INTO chatroomtbl VALUES (chatroomtbl_seq.nextval, 2, 3, sysdate, 0); // 판매자 1과 구매자 3의 2번 게시물 채팅방
INSERT INTO chatroomtbl VALUES (chatroomtbl_seq.nextval, 5, 3, sysdate, 0); // 판매자 5와 구매자 1의 5번 게시물 채팅방
INSERT INTO chatroomtbl VALUES (chatroomtbl_seq.nextval, 6, 3, sysdate, 0); // 판매자 6과 구매자 1의 6번 게시물 채팅방

/*위의 채팅방 모두 구매 확정*/
INSERT INTO purchasecomptbl VALUES (purchasecomptbl_seq.nextval, 1, 2, sysdate);
INSERT INTO purchasecomptbl VALUES (purchasecomptbl_seq.nextval, 2, 3, sysdate);
INSERT INTO purchasecomptbl VALUES (purchasecomptbl_seq.nextval, 5, 1, sysdate);
INSERT INTO purchasecomptbl VALUES (purchasecomptbl_seq.nextval, 6, 1, sysdate);

commit;


/* 
[userNo = 1 기준]
찜한 목록 : 5,6,7
판매 목록 : 1,2
등록 목록 : 3,4,11
구매 목록 : 5,6
*/



