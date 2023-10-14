package com.treemarket.tree.controller;

import com.treemarket.tree.common.ApiResponse;
import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.dto.Productpost.ProductMypageResponse;
import com.treemarket.tree.dto.User.EditRequest;
import com.treemarket.tree.dto.User.EditResponse;
import com.treemarket.tree.service.AddressService;
import com.treemarket.tree.service.JoinService;
import com.treemarket.tree.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MyPageController {

    private final UserService userService;
    private final AddressService addressService;
    private final JoinService joinService;

    @PutMapping("/mypage/users/{userNo}")
    public ResponseEntity<ApiResponse> editUser(@PathVariable Long userNo, @RequestBody EditRequest editRequest){

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
        return ResponseEntity.ok().body(new ApiResponse(200, "회원 정보 저장 성공", edituser));

    }

    @DeleteMapping("/mypage/users/{userNo}")
    public ResponseEntity<ApiResponse> removeUser(@PathVariable Long userNo){
        userService.removeUser(userNo);
        return ResponseEntity.ok().body(new ApiResponse(200, "회원 탈퇴 성공", null));
    }

    @GetMapping("/mypage/likes/{userNo}")
    public ResponseEntity<ApiResponse> getLikePost(@PathVariable Long userNo){
        List<ProductMypageResponse> likePosts = joinService.findLikePostByUserNo(userNo);
        if(likePosts.isEmpty()){
            return ResponseEntity.ok().body(new ApiResponse(200, "물품 찜한 내역 0개", likePosts));
        }
        return ResponseEntity.ok().body(new ApiResponse(200, "물품 찜한 내역 성공", likePosts));
    }

    @GetMapping("/mypage/purchases/{userNo}")
    public ResponseEntity<ApiResponse> getPurchasePost(@PathVariable Long userNo){
        List<ProductMypageResponse> purchasePosts = joinService.findPurchasePostByUserNo(userNo);
        if(purchasePosts.isEmpty()){
            return ResponseEntity.ok().body(new ApiResponse(200, "물품 구매 내역 0개", purchasePosts));
        }
        return ResponseEntity.ok().body(new ApiResponse(200, "물품 구매 내역 성공", purchasePosts));
    }

    @GetMapping("/mypage/sales/{userNo}")
    public ResponseEntity<ApiResponse> getSalePost(@PathVariable Long userNo){
        List<ProductMypageResponse> salesPosts = joinService.findSalesPostByUserNo(userNo);
        if(salesPosts.isEmpty()){
            return ResponseEntity.ok().body(new ApiResponse(200, "물품 판매 내역 0개", salesPosts));
        }
        return ResponseEntity.ok().body(new ApiResponse(200, "물품 판매 내역 성공", salesPosts));
    }

    @GetMapping("/mypage/register/{userNo}")
    public ResponseEntity<ApiResponse> getRegisterPost(@PathVariable Long userNo){
        List<ProductMypageResponse> registerPosts = joinService.findRegisterPostByUserNo(userNo);
        if(registerPosts.isEmpty()){
            return ResponseEntity.ok().body(new ApiResponse(200, "물품 등록 내역 0개", registerPosts));
        }
        return ResponseEntity.ok().body(new ApiResponse(200, "물품 등록 내역 성공", registerPosts));
    }

}
