package com.treemarket.tree.dto.Productpost.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductsPostRequest {

    private Long userNo;
    private String title;
    private Long price;
    private String ctgName;
    private String Details;
    private String addressName;
    private String img;

}
