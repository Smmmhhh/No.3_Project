package com.treemarket.tree.controller;

import com.treemarket.tree.common.ApiResponse;
import com.treemarket.tree.domain.AddressVO;
import com.treemarket.tree.domain.ProductPostVO;
import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.dto.Productpost.req.ProductsPostRequest;
import com.treemarket.tree.dto.Productpost.res.ProductAllBoardResponse;
import com.treemarket.tree.dto.Productpost.res.ProductsAppResponse;
import com.treemarket.tree.dto.Productpost.res.ProductsPostResponse;
import com.treemarket.tree.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/products/*")
@RequiredArgsConstructor
public class ProductPostController {

    private final ProductPostService productPostService;
    private final AddressService addressService;
    private final CategoryService categoryService;
    private final UserService userService;
    private final AwsS3ServiceImpl awsS3Service;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> createPost(
            @RequestPart("multipartFiles") List<MultipartFile> multipartFiles,
            @RequestPart("productsPostRequest") ProductsPostRequest productsPostRequest) throws IOException {


        Long ctgId = categoryService.getCtgId(productsPostRequest.getCtgName());    //Category key값 찾기
        Long addressId = addressService.getAddressId(productsPostRequest.getAddressName()); //Address Key값 찾기

        if (ctgId != null && addressId != null) {    //key가 있을 때
            List<String> filesUrl = awsS3Service.uploadFile(multipartFiles);

            //리스트 형태로 받은 url 합치기
            String url = productPostService.joinUrls(filesUrl);

            // ProductPostVO 객체 생성
            ProductPostVO productpostVO = ProductPostVO.builder()
                    .ctgId(ctgId)
                    .userNo(productsPostRequest.getUserNo())
                    .addressId(addressId)
                    .title(productsPostRequest.getTitle())
                    .price(productsPostRequest.getPrice())
                    .details(productsPostRequest.getDetails())
                    .image(url)
                    .productStatus((long) 1)
                    .build();

            // 게시글 등록
            productPostService.savePost(productpostVO);

            //ProductsPostResponse 객체 생성
            ProductsPostResponse productsPostResponse = ProductsPostResponse.builder()
                    .userNickname(userService.getUserNickname(productsPostRequest.getUserNo()))
                    .title(productsPostRequest.getTitle())
                    .price(productsPostRequest.getPrice())
                    .ctgName(productsPostRequest.getCtgName())
                    .details(productsPostRequest.getDetails())
                    .addressName(productsPostRequest.getAddressName())
                    .image(filesUrl)
                    .build();

            //ApiResponse 반환
            return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("성공").data(productsPostResponse).build());  // 성공
        } else if (ctgId != null && addressId == null) {  //주소 key 값이 없을 때
            return ResponseEntity.badRequest().body(ApiResponse.builder().status(400).message("주소값 없음").build());
        } else if (ctgId == null && addressId != null) {    //주소 key 값이 없을 때
            return ResponseEntity.badRequest().body(ApiResponse.builder().status(400).message("카테고리값 없음").build());
        } else {
            return ResponseEntity.badRequest().body(ApiResponse.builder().status(400).message("주소, 키값 없음").build());
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllBoards() {
        List<ProductPostVO> productPostVOList = productPostService.getAllBoards();

        //Response 리스트 객체 생성
        List<ProductAllBoardResponse> productAllBoardResponseList = new ArrayList<>();

        //productPostVOList를 productAllBoardResponse 객체로 변환해주기
        for(int i = 0; i < productPostVOList.size(); i++) {
            ProductAllBoardResponse productAllBoardResponse = ProductAllBoardResponse.builder()
                    .postId(productPostVOList.get(i).getPostId())
                    .ctgName(categoryService.getCtgName(productPostVOList.get(i).getCtgId()))
                    .userNickname(userService.getUserNickname(productPostVOList.get(i).getUserNo()))
                    .title(productPostVOList.get(i).getTitle())
                    .price(productPostVOList.get(i).getPrice())
                    .addressName(addressService.getAddressName(productPostVOList.get(i).getAddressId()))
                    // 첫번쨰 url 값 가져오기(대표 이미지)
                    .image(productPostService.parseAddress(productPostVOList.get(i).getImage()).get(0))
                    .productStatus(productPostVOList.get(i).getProductStatus())
                    .build();
            productAllBoardResponseList.add(productAllBoardResponse);
        }

        // 리스트가 비어있을 경우
        if (productAllBoardResponseList.isEmpty())
            return ResponseEntity.ok().body(ApiResponse.builder().status(400).message("리스트없음").build());
        return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("성공").data(productAllBoardResponseList).build());
    }


    @GetMapping("/region/{sido}/{sigungu}/{town}")
    public ResponseEntity<ApiResponse> findBoardsByLocation(@PathVariable String sido,
                                                            @PathVariable String sigungu,
                                                            @PathVariable String town) {

        System.out.println(sido);
        // Address id 찾기
        AddressVO addressVO = AddressVO.builder()
                .sido(sido)
                .sigungu(sigungu)
                .town(town)
                .build();

        Long addressId = addressService.getAddressId(addressVO);

        List<ProductPostVO> productPostVOList = productPostService.findBoardsByLocation(addressId);

        //Response 리스트 객체 생성
        List<ProductAllBoardResponse> productAllBoardResponseList = new ArrayList<>();
        //productPostVOList를 productAllBoardResponse 객체로 변환해주기
        for(int i = 0; i < productPostVOList.size(); i++) {
            ProductAllBoardResponse productAllBoardResponse = ProductAllBoardResponse.builder()
                    .postId(productPostVOList.get(i).getPostId())
                    .ctgName(categoryService.getCtgName(productPostVOList.get(i).getCtgId()))
                    .userNickname(userService.getUserNickname(productPostVOList.get(i).getUserNo()))
                    .title(productPostVOList.get(i).getTitle())
                    .price(productPostVOList.get(i).getPrice())
                    .addressName(addressService.getAddressName(productPostVOList.get(i).getAddressId()))
                    // 첫번쨰 url 값 가져오기(대표 이미지)
                    .image(productPostService.parseAddress(productPostVOList.get(i).getImage()).get(0))
                    .productStatus(productPostVOList.get(i).getProductStatus())
                    .build();
            productAllBoardResponseList.add(productAllBoardResponse);
        }

        // 리스트가 비어있을 경우
        if (productPostVOList.isEmpty())
            return ResponseEntity.ok().body(ApiResponse.builder().status(400).message("리스트없음").build());

        return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("성공").data(productAllBoardResponseList).build());
    }

    @GetMapping("/detail/{postId}")
    public ResponseEntity<ApiResponse> getPostDetails(@PathVariable Long postId) {
        // 요청한 게시물 객체 가져오기
        ProductPostVO productPostVO = productPostService.getPostDetails(postId);

        //ProductsPostResponse 객체 생성
        List<String> filesUrl = productPostService.parseAddress(productPostVO.getImage());

        ProductsPostResponse productsPostResponse = ProductsPostResponse.builder()
                .postId(postId)
                .userNickname(userService.getUserNickname(productPostVO.getUserNo()))
                .title(productPostVO.getTitle())
                .price(productPostVO.getPrice())
                .ctgName(categoryService.getCtgName(productPostVO.getCtgId()))
                .details(productPostVO.getDetails())
                .addressName(addressService.getAddressName(productPostVO.getAddressId()))
                .image(filesUrl)
                .build();

        if (productPostVO == null)
            return ResponseEntity.ok().body(ApiResponse.builder().status(400).message("실패").build());
        return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("성공").data(productsPostResponse).build());
    }

    @GetMapping("/app")
    private List<ProductsAppResponse> getAllPostsForApp(){
        return productPostService.getAllPostsForApp();

    }

    @GetMapping("/app")
    private List<ProductsAppResponse> getAllPostsForApp(){
        return productPostService.getAllPostsForApp();
    }




}