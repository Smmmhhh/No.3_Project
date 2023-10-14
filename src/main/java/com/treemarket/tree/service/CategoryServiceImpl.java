package com.treemarket.tree.service;

import com.treemarket.tree.mapper.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    CategoryMapper categoryMapper;

    @Override
    public Long getCtgId(String ctgName) {
        return categoryMapper.getCtgId(ctgName);
    }
}
