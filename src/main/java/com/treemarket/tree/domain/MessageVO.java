package com.treemarket.tree.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageVO {
    private Long messageId;
    private Long roomId;
    private Long userNo;
    private String message;
    private String creationDate;
    private Long readValidity;
    private Long deleteValidity;
}
