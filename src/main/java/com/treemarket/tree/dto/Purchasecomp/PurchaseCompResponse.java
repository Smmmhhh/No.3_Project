package com.treemarket.tree.dto.Purchasecomp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PurchaseCompResponse {
    private Long purchasecompId;
    private Long postId;
    private Long sellerNo;
    private Long buyerNo;
    private String creationDate;

    @Builder

    public PurchaseCompResponse(Long purchasecompId, Long postId, Long sellerNo,
                                Long buyerNo, String creationDate) {
        this.purchasecompId = purchasecompId;
        this.postId = postId;
        this.sellerNo = sellerNo;
        this.buyerNo = buyerNo;
        this.creationDate = creationDate;
    }
}
