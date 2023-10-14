package com.treemarket.tree.service;

import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.dto.User.EditResponse;

public interface UserService {
    UserVO login(String id, String passWord);
    boolean checkId(String userId);
    boolean checkNickname(String userId);
    UserVO findUserByUserId(String userId);
    UserVO findUserByUserNo(Long userNo);
    void saveUser(UserVO userVO);
    void editUser(EditResponse editResponse);
    void removeUser(Long userNo);

}