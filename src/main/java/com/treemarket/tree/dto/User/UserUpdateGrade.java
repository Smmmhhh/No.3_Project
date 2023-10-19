package com.treemarket.tree.dto.User;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserUpdateGrade {
    private Long userNo;
    private String userGrade;

    @Builder
    public UserUpdateGrade(Long userNo, String userGrade) {
        this.userNo = userNo;
        this.userGrade = userGrade;
    }
}
