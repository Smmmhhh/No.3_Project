package com.treemarket.tree.mapper;

import com.treemarket.tree.domain.CtgVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TestMapper {
    public List<CtgVO> selectAllList() throws Exception;
}
