package com.treemarket.tree.service;

import com.treemarket.tree.domain.ProductPostVO;
import com.treemarket.tree.dto.Productpost.req.AdminPostUpdateReq;
import com.treemarket.tree.dto.Productpost.res.ProductAllBoardResponse;
import com.treemarket.tree.dto.Productpost.res.ProductsAppResponse;

import java.util.List;

public interface ProductPostService {

    void savePost(ProductPostVO productpostVO);
    List<ProductPostVO> getAllBoards(int pageSize, int offset);
    int getTotalCount();
    List<ProductPostVO> findBoardsByLocation(Long addressId);
    ProductPostVO getPostDetails(Long postId);
    void modifyPost(ProductPostVO productpostVO);
    void deletePost(Long postId);
    void updatePostStatus(AdminPostUpdateReq adminPostUpdateReq);
    String joinUrls(List<String> urls);
    List<ProductAllBoardResponse> replaceAllBoardResponse(List<ProductPostVO> productPostVOList);

    List<ProductsAppResponse> getAllPostsForApp();

    List<String> parseAddress(String joinUrl);

}
