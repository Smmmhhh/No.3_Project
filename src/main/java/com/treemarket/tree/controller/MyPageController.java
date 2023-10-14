package com.treemarket.tree.controller;

import com.treemarket.tree.common.ApiResponse;
import com.treemarket.tree.domain.ProductPostVO;
import com.treemarket.tree.dto.Productpost.req.ProductModifyRequest;
import com.treemarket.tree.service.AddressService;
import com.treemarket.tree.service.CategoryService;
import com.treemarket.tree.service.ProductPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage/*")
public class MyPageController {

    private final ProductPostService productPostService;
    private final CategoryService categoryService;
    private final AddressService addressService;

    @GetMapping("/productsedit/{postId}")
    public ResponseEntity<ApiResponse> getPostDetails(@PathVariable Long postId) {

        ProductPostVO productPostVO = productPostService.getPostDetails(postId);
        if (productPostVO == null)
            return ResponseEntity.ok().body(ApiResponse.builder().status(400).message("실패").build());
        return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("성공").data(productPostVO).build());
    }

    @PutMapping("/productsedit/{postId}")
    public ResponseEntity<ApiResponse> modifyPost(@PathVariable Long postId, @RequestBody ProductModifyRequest productModifyRequest) {

        Long ctgId;
        Long addressId;

        try {
            ctgId = categoryService.getCtgId(productModifyRequest.getCtgName());  //Category key값 찾기
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.builder().status(400).message("카테고리 키값 오류").build());
        }

        try {
            addressId = addressService.getAddressId(productModifyRequest.getAddressName()); //Address Key값 찾기
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.builder().status(400).message("주소 키값 오류").build());
        }

        // ProductPostVO 수정 객체 생성
        ProductPostVO productpostVO = ProductPostVO.builder()
                .postId(postId)
                .ctgId(ctgId)
                .addressId(addressId)
                .title(productModifyRequest.getTitle())
                .price(productModifyRequest.getPrice())
                .details(productModifyRequest.getDetails())
                .image(productModifyRequest.getImage())
                .build();

        // 게시글 수정
        try {
            // 게시글 UPDATE
            productPostService.modifyPost(productpostVO);
            // UPDATE 게시물 가져오기
            ProductPostVO productResponse = productPostService.getPostDetails(postId);
            if(productResponse == null) return ResponseEntity.badRequest().body(ApiResponse.builder().status(400).message("없는 게시글 입니다.").build());
            return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("성공").data(productResponse).build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.builder().status(400).message("쿼리문 오류").build());
        }
    }



    @DeleteMapping("/products/delete/{postId}")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable Long postId) {
        try {
            productPostService.deletePost(postId);
            ProductPostVO productPostVO = productPostService.getPostDetails(postId);
            return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("게시물 삭제 성공").data(productPostVO).build());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.builder().status(500).message("게시물 삭제 실패").build());
        }
    }

}
