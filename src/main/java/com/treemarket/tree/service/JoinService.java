package com.treemarket.tree.service;

import com.treemarket.tree.dto.Productpost.ProductMypageResponse;
import com.treemarket.tree.dto.Productpost.res.AdminProductPostList;
import com.treemarket.tree.dto.User.AdminUserList;

import java.util.List;

public interface JoinService {
    List<ProductMypageResponse> findLikePostByUserNo(Long userNo);
    List<ProductMypageResponse> findPurchasePostByUserNo(Long userNo);
    List<ProductMypageResponse> findSalesPostByUserNo(Long userNo);
    List<ProductMypageResponse> findRegisterPostByUserNo(Long userNo);
    
    List<AdminProductPostList> getAllBoards();

    List<AdminUserList> getAllUsers();
}
