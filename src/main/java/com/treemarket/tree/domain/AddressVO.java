package com.treemarket.tree.domain;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
public class AddressVO {
    private Long addressId;
    private String sido;
    private String sigungu;
    private String town;
    private Long latitude;
    private Long longitude;

    @Builder
    public AddressVO(Long addresId, String sido, String sigungu, String town, Long latitude, Long longitude) {
        this.addressId = addresId;
        this.sido = sido;
        this.sigungu = sigungu;
        this.town = town;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
