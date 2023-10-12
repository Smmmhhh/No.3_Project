package com.treemarket.tree.mapper;

import com.treemarket.tree.domain.UserVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    UserVO getUserId(String userId);
    UserVO getUserNickname(String userNickname);
    void saveUser(UserVO uservo);


}
