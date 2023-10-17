package com.treemarket.tree.service;

import com.treemarket.tree.domain.ProductPostVO;
import com.treemarket.tree.dto.Productpost.req.AdminPostUpdateReq;
import com.treemarket.tree.mapper.ProductPostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductPostServiceImpl implements ProductPostService {

    @Autowired
    private ProductPostMapper productPostMapper;

    @Override
    public void savePost(ProductPostVO productpostVO) {
        System.out.println(productpostVO.toString());
        productPostMapper.savePost(productpostVO);
    }

    @Override
    public List<ProductPostVO> getAllBoards() {
        return productPostMapper.getAllBoards();
    }

    @Override
    public List<ProductPostVO> findBoardsByLocation(Long addressId) {
        return productPostMapper.findBoardsByLocation(addressId);
    }

    @Override
    public ProductPostVO getPostDetails(Long postId) {
        return productPostMapper.getPostDetails(postId);
    }

    @Override
    public void modifyPost(ProductPostVO productpostVO) {
        productPostMapper.modifyPost(productpostVO);
    }

    @Override
    public void deletePost(Long postId) {
        productPostMapper.deletePost(postId);
    }

    @Override
    public void updatePostStatus(AdminPostUpdateReq adminPostUpdateReq) {
        productPostMapper.updatePostStatus(adminPostUpdateReq);
    }
    @Override
    public String joinUrls(String[] urls) {
        StringBuilder joinUrl = new StringBuilder();
        for(int i = 0; i < urls.length; i++) {
            joinUrl.append(urls[i]);
            if(i+1 < urls.length) joinUrl.append(",");
        }
        return joinUrl.toString();
    }
}
