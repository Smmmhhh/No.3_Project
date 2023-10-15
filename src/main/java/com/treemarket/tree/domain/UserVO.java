package com.treemarket.tree.domain;

import lombok.*;

@Getter
@NoArgsConstructor
public class UserVO {
    private Long userNo;
    private String userId;
    private Long userAddress;
    private String userPw;
    private String userName;
    private String userNickname;
    private String userPhoneno;
    private String userGrade;
    private String userValidity;

    @Builder
    public UserVO(Long userNo, String userId, Long userAddress, String userPw,
                  String userName, String userNickname,
                  String userPhoneno, String userGrade, String userValidity) {
        this.userNo = userNo;
        this.userId = userId;
        this.userAddress = userAddress;
        this.userPw = userPw;
        this.userName = userName;
        this.userNickname = userNickname;
        this.userPhoneno = userPhoneno;
        this.userGrade = userGrade;
        this.userValidity = userValidity;
    }
}
