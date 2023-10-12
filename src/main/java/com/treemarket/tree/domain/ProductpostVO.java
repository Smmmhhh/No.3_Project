package com.treemarket.tree.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductpostVO {
    private Long postId;
    private Long ctgId;
    private Long userNo;
    private Long addressId;
    private String title;
    private Long price;
    private String details;
    private String image;
    private Long productstatus;
}
