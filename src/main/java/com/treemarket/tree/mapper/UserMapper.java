package com.treemarket.tree.mapper;

import com.treemarket.tree.domain.UserVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    UserVO checkId(String userId);
    UserVO checkNickname(String userNickname);
    void saveUser(UserVO uservo);


}
