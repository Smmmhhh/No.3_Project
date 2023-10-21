package com.treemarket.tree.dto.Productpost.res;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductsAppResponse {
    private String title;
    private Long price;
    private String image;

    @Builder

    public ProductsAppResponse(String title, Long price, String image) {
        this.title = title;
        this.price = price;
        this.image = image;
    }
}
