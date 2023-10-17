package com.treemarket.tree.service;

import com.treemarket.tree.domain.PurchaseCompVO;
import com.treemarket.tree.dto.Productpost.res.ProductMypageResponse;
import com.treemarket.tree.dto.Productpost.res.AdminProductPostList;
import com.treemarket.tree.dto.User.AdminUserList;
import com.treemarket.tree.mapper.JoinMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JoinServiceImpl implements JoinService{

    private final JoinMapper joinMapper;
    @Override
    public List<ProductMypageResponse> findLikePostByUserNo(Long userNo) {
        return joinMapper.findLikePostByUserNo(userNo);
    }

    @Override
    public List<ProductMypageResponse> findPurchasePostByUserNo(Long userNo) {
        return joinMapper.findPurchasePostByUserNo(userNo);
    }

    @Override
    public List<ProductMypageResponse> findSalesPostByUserNo(Long userNo) {
        return joinMapper.findSalesPostByUserNo(userNo);
    }

    @Override
    public List<ProductMypageResponse> findRegisterPostByUserNo(Long userNo) {
        return joinMapper.findRegisterPostByUserNo(userNo);
    }

    @Override
    public List<AdminProductPostList> getAllBoards() {
        return joinMapper.getAllBoards();
    }

    @Override
    public List<AdminUserList> getAllUsers() {
        return joinMapper.getAllUsers();
    }

    @Override
    public void savePurchaseComp(Long roomId) {
        joinMapper.savePurchaseComp(roomId);
    }

    @Override
    public Long getSellerNo(Long roomId) {
        return joinMapper.getSellerNo(roomId);
    }

    @Override
    public PurchaseCompVO getCompInfo(Long roomId) {
        return joinMapper.getCompInfo(roomId);
    }

    @Override
    public int getTransactionCount(Long userno) {
        return joinMapper.getTransactionCount(userno);
    }
}
