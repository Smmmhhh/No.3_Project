package com.treemarket.tree.mapper;

import com.treemarket.tree.domain.ProductpostVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductPostMapper {

    void savePost(ProductpostVO productpostVO);

}
