package com.treemarket.tree.domain;

import lombok.*;

@Getter
@NoArgsConstructor
public class ProductPostVO {
    private Long postId;
    private Long ctgId;
    private Long userNo;
    private Long addressId;
    private String title;
    private Long price;
    private String details;
    private String image;
    private String creationDate;
    private Long productStatus;

    @Builder
    public ProductPostVO(Long postId, Long ctgId, Long userNo,
                         Long addressId, String title, Long price, String details,
                         String image, String creationDate, Long productStatus) {
        this.postId = postId;
        this.ctgId = ctgId;
        this.userNo = userNo;
        this.addressId = addressId;
        this.title = title;
        this.price = price;
        this.details = details;
        this.image = image;
        this.creationDate = creationDate;
        this.productStatus = productStatus;
    }

    @Override
    public String toString() {
        return "YourObject{" +
                "postId=" + postId +
                ", ctgId=" + ctgId +
                ", userNo=" + userNo +
                ", addressId=" + addressId +
                ", title='" + title + '\'' +
                ", price=" + price +
                ", details='" + details + '\'' +
                ", image='" + image + '\'' +
                ", creationDate='" + creationDate + '\'' +
                ", productStatus=" + productStatus +
                '}';
    }

}
