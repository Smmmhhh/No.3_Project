package com.treemarket.tree.service;

import com.treemarket.tree.domain.ProductPostVO;
import com.treemarket.tree.dto.Productpost.req.AdminPostUpdateReq;

import java.util.List;

public interface ProductPostService {

    void savePost(ProductPostVO productpostVO);
    List<ProductPostVO> getAllBoards();
    List<ProductPostVO> findBoardsByLocation(Long addressId);
    ProductPostVO getPostDetails(Long postId);
    void modifyPost(ProductPostVO productpostVO);
    void deletePost(Long postId);
    void updatePostStatus(AdminPostUpdateReq adminPostUpdateReq);
}
