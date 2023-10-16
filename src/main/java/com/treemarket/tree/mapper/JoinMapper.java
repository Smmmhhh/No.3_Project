package com.treemarket.tree.mapper;

import com.treemarket.tree.dto.Productpost.res.ProductMypageResponse;
import com.treemarket.tree.dto.Productpost.res.AdminProductPostList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JoinMapper {
    List<ProductMypageResponse> findLikePostByUserNo(Long userNo); // 찜목록
    List<ProductMypageResponse> findPurchasePostByUserNo(Long userNo); // 구매목록
    List<ProductMypageResponse> findSalesPostByUserNo(Long userNo); // 판매 완료 목록
    List<ProductMypageResponse> findRegisterPostByUserNo(Long userNo); // 판매중 목록

    List<AdminProductPostList> getAllBoards();

}
