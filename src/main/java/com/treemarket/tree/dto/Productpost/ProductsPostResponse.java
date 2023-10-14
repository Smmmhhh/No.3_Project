package com.treemarket.tree.dto.Productpost;
import lombok.*;

@Getter
@NoArgsConstructor
public class ProductsPostResponse {

    private Long userNo;
    private String title;
    private Long price;
    private Long ctgId;
    private String details;
    private Long addressId;
    private String image;

    @Builder
    public ProductsPostResponse(Long userNo, String title, Long price, Long ctgId, String details, Long addressId, String image) {
        this.userNo = userNo;
        this.title = title;
        this.price = price;
        this.ctgId = ctgId;
        this.details = details;
        this.addressId = addressId;
        this.image = image;
    }
}
