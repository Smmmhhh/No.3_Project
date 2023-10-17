package com.treemarket.tree.dto.Productpost.req;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AdminPostUpdateReq {

    private Long postId;
    private Long productStatus;

    @Builder
    public AdminPostUpdateReq(Long postId, Long productStatus) {
        this.postId = postId;
        this.productStatus = productStatus;
    }
}
