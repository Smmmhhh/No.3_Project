package com.treemarket.tree.service;

import com.treemarket.tree.domain.UserVO;

public interface UserService {

    boolean getUserId(String userId);
    boolean getUserNickname(String userNickname);
    void saveUser(UserVO userVO);
    UserVO login(String id, String passWord);
    UserVO getUserNo(Long userNo);
    void editUser(UserVO userVO);
}
