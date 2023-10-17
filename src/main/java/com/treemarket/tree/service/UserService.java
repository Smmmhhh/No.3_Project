package com.treemarket.tree.service;

import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.dto.User.UserModifyResponse;
import com.treemarket.tree.dto.User.UserUpdateGrade;

public interface UserService {
    UserVO login(String id, String passWord);
    boolean checkId(String userId);
    boolean checkNickname(String userId);
    UserVO findUserByUserId(String userId);
    UserVO findUserByUserNo(Long userNo);
    void saveUser(UserVO userVO);
    void editUser(UserModifyResponse userModifyResponse);
    void removeUser(Long userNo);
    String getUserNickname(Long userId);
    void updateGrade(UserUpdateGrade userUpdateGrade);

}