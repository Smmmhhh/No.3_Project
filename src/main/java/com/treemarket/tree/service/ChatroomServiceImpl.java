package com.treemarket.tree.service;

import com.treemarket.tree.dto.Chatroom.ChatroomRequest;
import com.treemarket.tree.mapper.ChatroomMapper;
import com.treemarket.tree.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatroomServiceImpl implements ChatroomService{

    @Autowired
    private ChatroomMapper chatroomMapper;
    @Override
    public void saveChatroom(ChatroomRequest chatroomRequest) {
        chatroomMapper.saveChatroom(chatroomRequest);
    }
}
