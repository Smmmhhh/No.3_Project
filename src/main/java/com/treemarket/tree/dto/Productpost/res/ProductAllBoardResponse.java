package com.treemarket.tree.dto.Productpost.res;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductAllBoardResponse {

    private Long postId;
    private String ctgName;
    private String userNickname;
    private String addressName;
    private String title;
    private Long price;
    private String image;
    private Long productStatus;

    @Builder
    public ProductAllBoardResponse(Long postId, String ctgName, String userNickname,
                                   String addressName, String title, Long price,
                                   String image, Long productStatus) {
        this.postId = postId;
        this.ctgName = ctgName;
        this.userNickname = userNickname;
        this.addressName = addressName;
        this.title = title;
        this.price = price;
        this.image = image;
        this.productStatus = productStatus;
    }
}
