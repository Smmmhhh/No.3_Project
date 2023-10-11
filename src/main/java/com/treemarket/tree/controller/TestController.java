package com.treemarket.tree.controller;

import com.treemarket.tree.domain.CtgVO;
import com.treemarket.tree.service.TestService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class TestController {

    @Resource
    private TestService testservice;

    @GetMapping("/api/hello")
    public List<CtgVO> allList() throws Exception {
        List<CtgVO> allList = testservice.selectAllList();
        return allList;
    }
}