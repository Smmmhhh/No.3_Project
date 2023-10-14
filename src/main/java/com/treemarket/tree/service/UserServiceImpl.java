package com.treemarket.tree.service;

import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.dto.User.EditResponse;
import com.treemarket.tree.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserVO login(String id, String passWord) {
        UserVO userVO = userMapper.findUserByUserId(id);
        if (userVO == null) {
            return null;
        }
        if (userVO.getUserPw().equals(passWord))
            return userVO;
        return null;
    }

    @Override
    public boolean checkId(String userId) {
        UserVO userVO = userMapper.findUserByUserId(userId);
        return userVO == null;
    }

    @Override
    public boolean checkNickname(String userId) {
        UserVO userVO = userMapper.findUserByUserNickname(userId);
        return userVO == null;
    }

    @Override
    public UserVO findUserByUserId(String userId) {
        return userMapper.findUserByUserId(userId);
    }

    @Override
    public UserVO findUserByUserNo(Long userNo) {
        return userMapper.findUserByUserNo(userNo);
    }


    @Override
    public void saveUser(UserVO userVO) {
        userMapper.saveUser(userVO);
    }

    @Override
    public void editUser(EditResponse editResponse) {
        userMapper.editUser(editResponse);
    }

    @Override
    public void removeUser(Long userNo) {
        userMapper.removeUser(userNo);
    }
}