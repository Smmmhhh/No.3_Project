package com.treemarket.tree.service;

import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;

    @Override
    public boolean getUserId(String userId) {
        UserVO checkUser = userMapper.getUserId(userId);
        return checkUser == null;
    }

    @Override
    public boolean getUserNickname(String userNickname) {
        UserVO checkNickname = userMapper.getUserNickname(userNickname);
        return checkNickname == null;
    }

    @Override
    public void saveUser(UserVO userVO) {
        userMapper.saveUser(userVO);
    }

    @Override
    public UserVO login(String id, String passWord) {
        UserVO userVO = userMapper.getUserId(id);
        if(userVO == null){
            return null;
        }
        if(userVO.getUserPw().equals(passWord))
            return userVO;
        return null;
    }

    @Override
    public UserVO getUserNo(Long userNo) {
        return userMapper.getUserNo(userNo);
    }

    @Override
    public void editUser(UserVO userVO) {
        userMapper.editUser(userVO);
    }
}
