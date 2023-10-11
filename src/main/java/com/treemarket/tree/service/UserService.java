package com.treemarket.tree.service;

import com.treemarket.tree.domain.UserVO;

public interface UserService {
    boolean checkId(String userId);
    boolean checkNickname(String userNickname);
    void saveUser(UserVO uservo);
}
