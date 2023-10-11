package com.treemarket.tree.service;

import com.treemarket.tree.domain.CtgTblVo;
import java.util.List;

public interface CategoryService {
    // Mapper 클래스와 메서드를 똑같이 복사한 서비스 인터페이스
    // 의존성을 위한 파일 분리 작업
    public List<CtgTblVo> getCtgList() throws Exception;

}
