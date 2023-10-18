package com.treemarket.tree.dto.Productpost.req;

import lombok.*;

@Getter
@NoArgsConstructor
public class ProductsPostRequest {

    private Long userNo;
    private String title;
    private Long price;
    private String ctgName;
    private String details;
    private String addressName;

    @Builder
    public ProductsPostRequest(Long userNo, String title,
                               Long price, String ctgName,
                               String details, String addressName) {
        this.userNo = userNo;
        this.title = title;
        this.price = price;
        this.ctgName = ctgName;
        this.details = details;
        this.addressName = addressName;
    }
}