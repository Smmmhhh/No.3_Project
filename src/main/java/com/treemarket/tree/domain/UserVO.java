package com.treemarket.tree.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserVO {
    private Long userNo;
    private String userId;
    private Long userAddress;
    private String userPw;
    private String userName;
    private String userNickname;
    private String userPhoneno;
    private String userValidity;

    @Builder

    public UserVO(Long userNo, String userId, Long userAddress, String userPw,
                  String userName, String userNickname, String userPhoneno, String userValidity) {
        this.userNo = userNo;
        this.userId = userId;
        this.userAddress = userAddress;
        this.userPw = userPw;
        this.userName = userName;
        this.userNickname = userNickname;
        this.userPhoneno = userPhoneno;
        this.userValidity = userValidity;
    }
}
