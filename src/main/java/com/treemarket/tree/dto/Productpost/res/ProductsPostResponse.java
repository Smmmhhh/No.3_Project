package com.treemarket.tree.dto.Productpost.res;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
public class ProductsPostResponse {

    private String userNickname;
    private String title;
    private Long price;
    private String ctgName;
    private String details;
    private String addressName;
    private List<String> image;

    @Builder
    public ProductsPostResponse(String userNickname, String title, Long price,
                                String ctgName, String details,
                                String addressName, List<String> image) {
        this.userNickname = userNickname;
        this.title = title;
        this.price = price;
        this.ctgName = ctgName;
        this.details = details;
        this.addressName = addressName;
        this.image = image;
    }
}
