package com.treemarket.tree.mapper;

import com.treemarket.tree.dto.Productpost.res.AdminProductPostList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JoinMapper {

    List<AdminProductPostList> getAllBoards();

}
