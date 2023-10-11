package com.treemarket.tree.service;

import com.treemarket.tree.domain.CtgTblVo;
import com.treemarket.tree.model.mapper.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// CategoryService 인터페이스를 구현한 클래스
// CategoryService 인터페이스를 상속 받음
// @Service 어노테이션을 사용해서 객체생성
// CategoryMapper.xml를 의존성 주입을 해서 sql문을 읽어온다.
// CategoryService 인터페이스를 상속했기에 Override 해서 메서드를 가져오고 CategoryMapper.xml 의 sql문을 입력

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryMapper categoryMapper;

    @Override
    public List<CtgTblVo> getCtgList() throws Exception {
        return categoryMapper.getCtgList();
    }

}
