package com.treemarket.tree.mapper;

import com.treemarket.tree.domain.CategoryVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CategoryMapper {

    long getCtgId(String ctgName);

}
