package com.treemarket.tree.service;

import com.treemarket.tree.dto.Productpost.res.AdminProductPostList;
import com.treemarket.tree.mapper.JoinMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JoinServiceImpl implements JoinService {

    @Autowired
    private JoinMapper joinMapper;

    @Override
    public List<AdminProductPostList> getAllBoards() {
        return joinMapper.getAllBoards();
    }
}
