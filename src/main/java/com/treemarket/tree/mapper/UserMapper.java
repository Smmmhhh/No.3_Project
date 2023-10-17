package com.treemarket.tree.mapper;

import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.dto.User.UserModifyResponse;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface UserMapper {
    UserVO findUserByUserId(String userId);
    UserVO findUserByUserNickname(String userNickname);
    UserVO findUserByUserNo(Long userNo);
    void saveUser(UserVO userVO);
    void editUser(UserModifyResponse userModifyResponse);
    void removeUser(Long userNo);
    String getUserNickname(Long userId);

}