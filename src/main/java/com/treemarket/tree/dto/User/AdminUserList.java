package com.treemarket.tree.dto.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class AdminUserList {
    private Long userNo;
    private String userId;
    private String userNickname;
    private String userName;
    private String userPhoneno;
    private Long transactionCount;
    private String userGrade;
    private Long postCount;
    private String userValidity;

    @Builder

    public AdminUserList(Long userNo, String userId, String userNickname, String userName,
                         String userPhoneno, Long transactionCount, String userGrade, Long postCount, String userValidity) {
        this.userNo = userNo;
        this.userId = userId;
        this.userNickname = userNickname;
        this.userName = userName;
        this.userPhoneno = userPhoneno;
        this.transactionCount = transactionCount;
        this.userGrade = userGrade;
        this.postCount = postCount;
        this.userValidity = userValidity;
    }
}
