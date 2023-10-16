package com.treemarket.tree.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CategoryMapper {
    Long getCtgId (String ctgName);
    String getCtgName (Long ctgId);
}
