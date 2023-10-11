package com.treemarket.tree.model.mapper;

import com.treemarket.tree.domain.CtgTblVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {

    public List<CtgTblVo> getCtgList() throws Exception; //mybatis.mapper 패키지의 sql id값과 메소드명 일치
}
