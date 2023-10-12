package com.treemarket.tree.service;

import com.treemarket.tree.domain.CategoryVO;
import com.treemarket.tree.mapper.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServicerImpl implements CategoryService{

    @Autowired
    private CategoryMapper categoryMapper;


    @Override
    public long getCtgId(String ctgName) {
        return categoryMapper.getCtgId(ctgName);
    }
}
