package com.treemarket.tree.dto.Productpost.res;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
public class ProductsPostResponse {

    private Long postId;
    private String userNickname;
    private String title;
    private Long price;
    private String ctgName;
    private String details;
    private String addressName;
    private String userGrade;
    private List<String> image;

    @Builder
    public ProductsPostResponse(Long postId, String userNickname,
                                String title, Long price, String ctgName,
                                String details, String addressName,
                                List<String> image, String userGrade) {
        this.postId = postId;
        this.userNickname = userNickname;
        this.title = title;
        this.price = price;
        this.ctgName = ctgName;
        this.details = details;
        this.addressName = addressName;
        this.image = image;
        this.userGrade = userGrade;
    }
}
