package com.treemarket.tree.controller;

import com.treemarket.tree.common.ApiResponse;
import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.domain.ProductPostVO;
import com.treemarket.tree.dto.Productpost.ProductMypageResponse;
import com.treemarket.tree.dto.User.EditRequest;
import com.treemarket.tree.dto.User.EditResponse;
import com.treemarket.tree.dto.Productpost.req.ProductModifyRequest;
import com.treemarket.tree.service.AddressService;
import com.treemarket.tree.service.JoinService;
import com.treemarket.tree.service.UserService;
import com.treemarket.tree.service.CategoryService;
import com.treemarket.tree.service.ProductPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage/*")
public class MyPageController {

    private final UserService userService;
    private final AddressService addressService;
    private final JoinService joinService;  
    private final ProductPostService productPostService;
    private final CategoryService categoryService;


    @PutMapping("/users/{userNo}")
    public ResponseEntity<ApiResponse> editUser(@PathVariable Long userNo, @RequestBody EditRequest editRequest, HttpSession session){

        String inputAddress = editRequest.getUserAddress();
        Long addressId = addressService.getAddressId(inputAddress);
        if(addressId == null){
            return ResponseEntity.badRequest().body(new ApiResponse(409, "주소를 찾을 수 없음", null));
        }

        if(!userService.findUserByUserNo(userNo).getUserNickname().equals(editRequest.getUserNickname())){
            boolean isNicknameUnique  = userService.checkNickname(editRequest.getUserNickname());
            if (!isNicknameUnique) {
                return ResponseEntity.badRequest().body(new ApiResponse(409, "닉네임 중복",null));
            }
        }

        EditResponse editResponse = EditResponse.builder()
                .userNo(userNo)
                .userPw(editRequest.getUserPw())
                .userNickname(editRequest.getUserNickname())
                .userAddress(addressId)
                .userPhoneno(editRequest.getUserPhoneno())
                .build();

        userService.editUser(editResponse);

        UserVO edituser = userService.findUserByUserNo(userNo);

        session.setAttribute("userData", edituser);
        return ResponseEntity.ok().body(new ApiResponse(200, "회원 정보 저장 성공", edituser));
    }

    @DeleteMapping("/users/{userNo}")
    public ResponseEntity<ApiResponse> removeUser(@PathVariable Long userNo){
        userService.removeUser(userNo);
        return ResponseEntity.ok().body(new ApiResponse(200, "회원 탈퇴 성공", null));
    }

    @GetMapping("/likes/{userNo}")
    public ResponseEntity<ApiResponse> getLikePost(@PathVariable Long userNo){
        List<ProductMypageResponse> likePosts = joinService.findLikePostByUserNo(userNo);
        if(likePosts.isEmpty()){
            return ResponseEntity.ok().body(new ApiResponse(200, "물품 찜한 내역 0개", likePosts));
        }
        return ResponseEntity.ok().body(new ApiResponse(200, "물품 찜한 내역 성공", likePosts));
    }

    @GetMapping("/purchases/{userNo}")
    public ResponseEntity<ApiResponse> getPurchasePost(@PathVariable Long userNo){
        List<ProductMypageResponse> purchasePosts = joinService.findPurchasePostByUserNo(userNo);
        if(purchasePosts.isEmpty()){
            return ResponseEntity.ok().body(new ApiResponse(200, "물품 구매 내역 0개", purchasePosts));
        }
        return ResponseEntity.ok().body(new ApiResponse(200, "물품 구매 내역 성공", purchasePosts));
    }

    @GetMapping("/sales/{userNo}")
    public ResponseEntity<ApiResponse> getSalePost(@PathVariable Long userNo){
        List<ProductMypageResponse> salesPosts = joinService.findSalesPostByUserNo(userNo);
        if(salesPosts.isEmpty()){
            return ResponseEntity.ok().body(new ApiResponse(200, "물품 판매 내역 0개", salesPosts));
        }
        return ResponseEntity.ok().body(new ApiResponse(200, "물품 판매 내역 성공", salesPosts));
    }

    @GetMapping("/register/{userNo}")
    public ResponseEntity<ApiResponse> getRegisterPost(@PathVariable Long userNo) {
        List<ProductMypageResponse> registerPosts = joinService.findRegisterPostByUserNo(userNo);
        if (registerPosts.isEmpty()) {
            return ResponseEntity.ok().body(new ApiResponse(200, "물품 등록 내역 0개", registerPosts));
        }
        return ResponseEntity.ok().body(new ApiResponse(200, "물품 등록 내역 성공", registerPosts));

    }

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
