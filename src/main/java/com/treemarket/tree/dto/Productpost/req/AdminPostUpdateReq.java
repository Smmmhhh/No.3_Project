package com.treemarket.tree.dto.Productpost.req;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdminPostUpdateReq {

    private Long postId;
    private Long productPostStatus;

    @Builder
    public AdminPostUpdateReq(Long postId, Long productPostStatus) {
        this.postId = postId;
        this.productPostStatus = productPostStatus;
    }
}
