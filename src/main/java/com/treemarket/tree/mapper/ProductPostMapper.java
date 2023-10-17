package com.treemarket.tree.mapper;

import com.treemarket.tree.domain.ProductPostVO;
import com.treemarket.tree.dto.Productpost.req.AdminPostUpdateReq;
import com.treemarket.tree.dto.Productpost.res.ProductsAppResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductPostMapper {

    void savePost(ProductPostVO productpostVO);
    List<ProductPostVO> getAllBoards(int pageSize, int offset);
    int getTotalCount();
    List<ProductPostVO> findBoardsByLocation(Long addressId);
    ProductPostVO getPostDetails(Long postId);
    void modifyPost(ProductPostVO productpostVO);
    void deletePost(Long postId);
    void updatePostStatus(AdminPostUpdateReq adminPostUpdateReq);
    String parseAddress(String joinUrl);

    List<ProductsAppResponse> getAllPostsForApp();
}
