package com.treemarket.tree.mapper;

import com.treemarket.tree.domain.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

//mybatis.mapper 패키지의 sql id값과 메소드명 일치
@Mapper
public interface UserMapper {

    /* 유저 리스트 */
    List<UserVO> findAllUser();

    /* 회원가입 */
    void saveUser (UserVO userVO);
    UserVO getUserId(String id);
    UserVO getUserNickName(String userNickname);

    /* 유저 정보수정 */
    void updateUser (UserVO userVO);

}
