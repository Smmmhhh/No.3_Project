package com.treemarket.tree.dto.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserDataResponse {
    private Long userNo;
    private String userId;
    private String userAddress;
    private String userPw;
    private String userName;
    private String userNickname;
    private String userPhoneno;
    private String userGrade;
    private String userValidity;

    @Builder

    public UserDataResponse(Long userNo, String userId, String userAddress, String userPw,
                            String userName, String userNickname, String userPhoneno, String userGrade, String userValidity) {
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
