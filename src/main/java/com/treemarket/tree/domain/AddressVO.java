package com.treemarket.tree.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressVO {
    private Long addressId;
    private String sido;
    private String sigungu;
    private String town;
    private Long latitude;
    private Long longitude;
}
