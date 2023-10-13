package com.treemarket.tree.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CategoryMapper {
    int getCtgId (String ctgName);
}
