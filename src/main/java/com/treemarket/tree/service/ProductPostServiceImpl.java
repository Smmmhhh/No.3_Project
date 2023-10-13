package com.treemarket.tree.service;

import com.treemarket.tree.domain.ProductPostVO;
import com.treemarket.tree.mapper.ProductPostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductPostServiceImpl implements ProductPostService{

    @Autowired
    private ProductPostMapper productPostMapper;



    @Override
    public void savePost(ProductPostVO productpostVO) {
        productPostMapper.savePost(productpostVO);
    }

}
