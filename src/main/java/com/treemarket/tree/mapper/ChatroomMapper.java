package com.treemarket.tree.mapper;

import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.dto.Chatroom.ChatroomRequest;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ChatroomMapper {
    void saveChatroom(ChatroomRequest chatroomRequest);
}
