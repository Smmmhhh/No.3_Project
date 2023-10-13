package com.treemarket.tree.mapper;

import com.treemarket.tree.domain.ProductPostVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductPostMapper {

    void savePost(ProductPostVO productpostVO);

}
