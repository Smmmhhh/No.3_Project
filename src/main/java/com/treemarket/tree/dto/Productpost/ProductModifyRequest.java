package com.treemarket.tree.dto.Productpost;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ProductModifyRequest {

    private String title;
    private Long price;
    private String ctgName;
    private String details;
    private String addressName;
    private String image;

    @Builder
    public ProductModifyRequest(String title, Long price, String ctgName, String details,
                                String addressName, String image) {
        this.title = title;
        this.price = price;
        this.ctgName = ctgName;
        this.details = details;
        this.addressName = addressName;
        this.image = image;
    }
}
