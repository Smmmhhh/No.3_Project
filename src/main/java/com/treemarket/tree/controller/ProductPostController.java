package com.treemarket.tree.controller;

import com.treemarket.tree.common.ApiResponse;
import com.treemarket.tree.domain.AddressVO;
import com.treemarket.tree.domain.ProductPostVO;
import com.treemarket.tree.dto.Productpost.req.ProductsPostRequest;
import com.treemarket.tree.dto.Productpost.res.ProductsPostResponse;
import com.treemarket.tree.service.AddressService;
import com.treemarket.tree.service.CategoryService;
import com.treemarket.tree.service.ProductPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products/*")
@RequiredArgsConstructor
public class ProductPostController {

    private final ProductPostService productPostService;
    private final AddressService addressService;
    private final CategoryService categoryService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> createPost(@RequestBody ProductsPostRequest productsPostRequest) {

        Long ctgId = categoryService.getCtgId(productsPostRequest.getCtgName());    //Category key값 찾기
        Long addressId = addressService.getAddressId(productsPostRequest.getAddressName()); //Address Key값 찾기

        if (ctgId != null && addressId != null) {    //key가 있을 때
            // ProductPostVO 객체 생성
            ProductPostVO productpostVO = ProductPostVO.builder()
                    .ctgId(ctgId)
                    .userNo(productsPostRequest.getUserNo())
                    .addressId(addressId)
                    .title(productsPostRequest.getTitle())
                    .price(productsPostRequest.getPrice())
                    .details(productsPostRequest.getDetails())
                    .image(productsPostRequest.getImg())
                    .productStatus((long) 1)
                    .build();

            // 게시글 등록
            productPostService.savePost(productpostVO);

            //ProductsPostResponse 객체 생성
            ProductsPostResponse productsPostResponse = ProductsPostResponse.builder()
                    .userNo(productsPostRequest.getUserNo())
                    .title(productsPostRequest.getTitle())
                    .price(productsPostRequest.getPrice())
                    .ctgId(ctgId)
                    .details(productsPostRequest.getDetails())
                    .addressId(addressId)
                    .image(productsPostRequest.getImg())
                    .build();

            //ApiResponse 반환
            return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("성공").data(productsPostResponse).build());  // 성공
        } else if (ctgId != null && addressId == null) {  //주소 key값이 없을 때
            return ResponseEntity.badRequest().body(ApiResponse.builder().status(400).message("주소값 없음").build());
        } else if (ctgId == null && addressId != null) {    //주소 key값이 없을 때
            return ResponseEntity.badRequest().body(ApiResponse.builder().status(400).message("카테고리값 없음").build());
        } else {
            return ResponseEntity.badRequest().body(ApiResponse.builder().status(400).message("주소, 키값 없음").build());
        }
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAllBoards() {
        List<ProductPostVO> productPostVOList = productPostService.getAllBoards();
        // 리스트가 비어있을 경우
        if (productPostVOList.isEmpty())
            return ResponseEntity.ok().body(ApiResponse.builder().status(400).message("리스트없음").build());
        return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("성공").data(productPostVOList).build());
    }


    @GetMapping("/region/{sido}/{sigungu}/{town}")
    public ResponseEntity<ApiResponse> findBoardsByLocation(@PathVariable String sido,
                                                            @PathVariable String sigungu,
                                                            @PathVariable String town) {
        // Address id 찾기
        AddressVO addressVO = AddressVO.builder()
                .sido(sido)
                .sigungu(sigungu)
                .town(town)
                .build();

        Long addressId = addressService.getAddressId(addressVO);
        System.out.println("컨트롤러" + addressId);


        List<ProductPostVO> productPostVOList = productPostService.findBoardsByLocation(addressId);
        // 리스트가 비어있을 경우
        if (productPostVOList.isEmpty())
            return ResponseEntity.ok().body(ApiResponse.builder().status(400).message("리스트없음").build());

        return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("성공").data(productPostVOList).build());
    }

    @GetMapping("/detail/{postId}")
    public ResponseEntity<ApiResponse> getPostDetails(@PathVariable Long postId) {

        ProductPostVO productPostVO = productPostService.getPostDetails(postId);
        if (productPostVO == null)
            return ResponseEntity.ok().body(ApiResponse.builder().status(400).message("실패").build());
        return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("성공").data(productPostVO).build());
    }


}
