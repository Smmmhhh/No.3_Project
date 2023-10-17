package com.treemarket.tree.dto.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserModifyRequest {
    private String userPw;
    private String userNickname;
    private String userPhoneno;
    private String userAddress;
}
