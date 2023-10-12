package com.treemarket.tree.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LikeVO {
    private Long likeId;
    private Long postId;
    private Long userNo;
}
