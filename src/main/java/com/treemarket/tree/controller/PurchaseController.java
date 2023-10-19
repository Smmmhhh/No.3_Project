package com.treemarket.tree.controller;

import com.treemarket.tree.common.ApiResponse;
import com.treemarket.tree.domain.PurchaseCompVO;
import com.treemarket.tree.dto.Chatroom.ChatroomRequest;
import com.treemarket.tree.dto.Purchasecomp.PurchaseCompResponse;
import com.treemarket.tree.dto.User.UserUpdateGrade;
import com.treemarket.tree.service.JoinService;
import com.treemarket.tree.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PurchaseController {

    private final JoinService joinService;
    private final UserService userService;

    @GetMapping("/chat/complete/{roomId}")
    public ResponseEntity<ApiResponse> savePurchaseComp(@PathVariable Long roomId){

        // DB에 거래완료 정보 저장
        try{
            joinService.savePurchaseComp(roomId);
        } catch (Exception e){
            return ResponseEntity.ok().body(new ApiResponse(409, "DB 저장 실패", null));
        }

        // 판매자 정보 가져옴
        Long sellerNo;
        try{
            sellerNo = joinService.getSellerNo(roomId);
        } catch (Exception e){
            return ResponseEntity.ok().body(new ApiResponse(410, "sellerNo 가져오기 실패", null));
        }

        // response 데이터 가져옴
        PurchaseCompVO purchaseCompVO;
        try{
            purchaseCompVO = joinService.getCompInfo(roomId);
        } catch (Exception e){
            return ResponseEntity.ok().body(new ApiResponse(411, "Response 데이터 가져오기 실패", null));
        }

        // 판매자 거래횟수 확인 후 등급 변경
        int sellerCount = joinService.getTransactionCount(sellerNo);
        if(sellerCount == 20){
            UserUpdateGrade sellerUpdateGrade = UserUpdateGrade.builder().userNo(sellerNo).userGrade("2").build();
            userService.updateGrade(sellerUpdateGrade);
        } else if(sellerCount == 100){
            UserUpdateGrade sellerUpdateGrade = UserUpdateGrade.builder().userNo(sellerNo).userGrade("3").build();
            userService.updateGrade(sellerUpdateGrade);
        }

        // 구매자 거래횟수 확인 후 등급 변경
        Long buyerNo = purchaseCompVO.getBuyerNo();
        int buyerCount = joinService.getTransactionCount(buyerNo);
        if(buyerCount == 20){
            UserUpdateGrade sellerUpdateGrade = UserUpdateGrade.builder().userNo(buyerNo).userGrade("2").build();
            userService.updateGrade(sellerUpdateGrade);
        } else if(buyerCount == 100){
            UserUpdateGrade sellerUpdateGrade = UserUpdateGrade.builder().userNo(buyerNo).userGrade("3").build();
            userService.updateGrade(sellerUpdateGrade);
        }


        PurchaseCompResponse purchaseCompResponse = PurchaseCompResponse.builder()
                .purchasecompId(purchaseCompVO.getPurchaseCompId())
                .postId(purchaseCompVO.getPostId())
                .sellerNo(sellerNo)
                .buyerNo(purchaseCompVO.getBuyerNo())
                .creationDate(purchaseCompVO.getPurchaseCompDate())
                .build();

        return ResponseEntity.ok().body(new ApiResponse(200, "거래 완료 성공", purchaseCompResponse));
    }
}