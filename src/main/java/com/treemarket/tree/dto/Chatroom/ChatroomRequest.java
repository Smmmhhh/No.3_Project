package com.treemarket.tree.dto.Chatroom;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatroomRequest {
    private Long postId;
    private Long buyerNo;

}
