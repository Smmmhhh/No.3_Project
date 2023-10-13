package com.treemarket.tree.controller;

import com.treemarket.tree.service.AddressService;

import com.treemarket.tree.service.CategoryService;
import com.treemarket.tree.service.ProductPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductPostController {

    @Autowired
    private ProductPostService productPostService;
    @Autowired
    private AddressService addressService;
    @Autowired
    CategoryService categoryService;

/*    @GetMapping("/ctg/{ctgName}")
    public ResponseEntity<String> ctgTest (@PathVariable String ctgName) {
        String name = "전자기기";

        System.out.println(categoryService.getCtgId(name));
*//*        System.out.println("찾아" + categoryService.getCtgId(ctgName).getCtgId());*//*
        return ResponseEntity.ok(ctgName);
    }*/


//    @PostMapping("/mypage/products")
//    public ResponseEntity<ProductpostVO> createPost(@RequestBody ProductpostVO productpostVO) {
//
//        int ctg = categoryService.getCtgId(productpostVO.getCtgId());
//
///*        System.out.println("찾자" + ctg.getCtgName());
//        System.out.println("찾자" + ctg.getCtgId());*/
//
//        String inputAddress = productpostVO.getAddressId();
//        Long addressId = addressService.getAddressId(inputAddress);
//        productpostVO.setAddressId(String.valueOf(addressId));  //주소를 키값으로 수정
//
//        productPostService.savePost(productpostVO);
//        return ResponseEntity.ok(productpostVO);
//    }
}
