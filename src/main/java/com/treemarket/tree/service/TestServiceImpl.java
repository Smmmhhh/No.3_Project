package com.treemarket.tree.service;

import com.treemarket.tree.domain.CtgVO;
import com.treemarket.tree.mapper.TestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestServiceImpl implements TestService{

    @Autowired
    TestMapper testmapper;

    @Override
    public List<CtgVO> selectAllList() throws Exception {
        return testmapper.selectAllList();
    }

}
