package com.treemarket.tree.service;

import com.treemarket.tree.dto.Productpost.ProductMypageResponse;

import java.util.List;

public interface JoinService {
    List<ProductMypageResponse> findLikePostByUserNo(Long userNo);
    List<ProductMypageResponse> findPurchasePostByUserNo(Long userNo);
    List<ProductMypageResponse> findSalesPostByUserNo(Long userNo);
    List<ProductMypageResponse> findRegisterPostByUserNo(Long userNo);
}
