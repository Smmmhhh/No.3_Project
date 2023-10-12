package com.treemarket.tree.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserVO {
    private Long userNo;
    private String userId;
    //private Long userAddress;
    private String userAddress;
    private String userPw;
    private String userName;
    private String userNickname;
    private String userPhoneno;
    private String userValidity;
}
