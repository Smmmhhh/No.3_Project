package com.treemarket.tree.controller;

import com.treemarket.tree.domain.ProductpostVO;
import com.treemarket.tree.service.AddressService;
import com.treemarket.tree.service.CategoryService;
import com.treemarket.tree.service.ProductPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mypage/*")
public class ProductPostController {

    @Autowired
    private ProductPostService productPostService;
    @Autowired
    private AddressService addressService;
    @Autowired
    private CategoryService categoryService;

    @PostMapping("/products")
    public ResponseEntity<ProductpostVO> createPost(@RequestBody ProductpostVO productpostVO) {
        long cthId = categoryService.getCtgId(String.valueOf(productpostVO.getCtgId()));
        productpostVO.setCtgId(cthId);  //카테고리를 키값으로 수정

        long addressId = 0;

        productPostService.savePost(productpostVO);
        return ResponseEntity.ok(productpostVO);
    }

}
