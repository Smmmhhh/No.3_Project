package com.treemarket.tree.mapper;

import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.dto.User.EditResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface UserMapper {
    UserVO findUserByUserId(String userId);
    UserVO findUserByUserNickname(String userNickname);
    UserVO findUserByUserNo(Long userNo);
    void saveUser(UserVO userVO);
    void editUser(EditResponse editResponse);
    void removeUser(Long userNo);

}