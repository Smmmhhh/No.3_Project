package com.treemarket.tree.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatroomVO {
    private Long roomId;
    private Long postId;
    private Long buyerId;
    private String creationDate;
    private Long deleteValidity;
}
