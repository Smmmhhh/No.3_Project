package com.treemarket.tree.dto.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EditResponse {
    private Long userNo;
    private String userPw;
    private String userNickname;
    private String userPhoneno;
    private Long userAddress;

    @Builder
    public EditResponse(Long userNo, String userPw, String userNickname, String userPhoneno, Long userAddress) {
        this.userNo = userNo;
        this.userPw = userPw;
        this.userNickname = userNickname;
        this.userPhoneno = userPhoneno;
        this.userAddress = userAddress;
    }
}