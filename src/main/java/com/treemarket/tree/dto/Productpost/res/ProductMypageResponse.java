package com.treemarket.tree.dto.Productpost.res;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductMypageResponse {
    private Long postId;
    private String title;
    private Long price;
    private String image;
}
