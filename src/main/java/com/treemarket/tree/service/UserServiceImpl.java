package com.treemarket.tree.service;

import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper usermapper;

    @Override
    public boolean checkId(String userId) {
        UserVO checkUser = usermapper.checkId(userId);
        return checkUser == null;
    }

    @Override
    public boolean checkNickname(String userNickname) {
        UserVO checkNickname = usermapper.checkNickname(userNickname);
        return checkNickname == null;
    }

    @Override
    public void saveUser(UserVO uservo) {
        usermapper.saveUser(uservo);
    }
}
