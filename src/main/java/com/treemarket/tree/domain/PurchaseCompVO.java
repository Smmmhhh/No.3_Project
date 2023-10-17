package com.treemarket.tree.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseCompVO {
    private Long purchaseCompId;
    private Long postId;
    private Long buyerNo;
    private String purchaseCompDate;
}
