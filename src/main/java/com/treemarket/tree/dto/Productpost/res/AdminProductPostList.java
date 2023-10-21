package com.treemarket.tree.dto.Productpost.res;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@NoArgsConstructor
@Getter
public class AdminProductPostList {

    private Long postId;
    private String ctgName;
    private String userId;
    private String sido;
    private String sigungu;
    private String town;
    private String title;
    private Long price;
    private String details;
    private String image;
    private String creationDate;
    private Long productStatus;

    @Builder
    public AdminProductPostList(Long postId, String ctgName, String userId,
                                String sido, String sigungu, String town,
                                String title, Long price, String details,
                                String image, String creationDate, Long productStatus) {
        this.postId = postId;
        this.ctgName = ctgName;
        this.userId = userId;
        this.sido = sido;
        this.sigungu = sigungu;
        this.town = town;
        this.title = title;
        this.price = price;
        this.details = details;
        this.image = image;
        this.creationDate = creationDate;
        this.productStatus = productStatus;
    }
}
