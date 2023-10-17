package com.treemarket.tree.service;

import com.treemarket.tree.domain.ProductPostVO;
import com.treemarket.tree.dto.Productpost.req.AdminPostUpdateReq;
import com.treemarket.tree.dto.Productpost.res.ProductAllBoardResponse;
import com.treemarket.tree.dto.Productpost.res.ProductsAppResponse;
import com.treemarket.tree.mapper.ProductPostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
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
    public String joinUrls(List<String> urls) {
        StringBuilder joinUrl = new StringBuilder();
        for(int i = 0; i < urls.size(); i++) {
            joinUrl.append(urls.get(i));
            if(i+1 < urls.size()) joinUrl.append(",");
        }
        return joinUrl.toString();
    }

    @Override
    public List<ProductAllBoardResponse> replaceAllBoardResponse(List<ProductPostVO> productPostVOList) {
        return null;
    }

    @Override
    public List<String> parseAddress(String joinUrl) {
        String[] parseUrlsArr = productPostMapper.parseAddress(joinUrl).split(",");
        List<String> parseUrlsList = new ArrayList<>();
        for(int i = 0; i < parseUrlsArr.length; i++) {
            parseUrlsList.add(parseUrlsArr[i]);
        }

        //url List 반환하기
        return parseUrlsList;
    }

    @Override
    public List<ProductsAppResponse> getAllPostsForApp() {
        return productPostMapper.getAllPostsForApp();
    }
}
