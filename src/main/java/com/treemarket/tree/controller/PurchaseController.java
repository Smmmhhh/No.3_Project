package com.treemarket.tree.controller;

import com.treemarket.tree.common.ApiResponse;
import com.treemarket.tree.domain.PurchaseCompVO;
import com.treemarket.tree.dto.Chatroom.ChatroomRequest;
import com.treemarket.tree.dto.Purchasecomp.PurchaseCompResponse;
import com.treemarket.tree.service.JoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PurchaseController {

    private final JoinService joinService;

    @GetMapping("/chat/complete/{roomId}")
    public ResponseEntity<ApiResponse> savePurchaseComp(@PathVariable Long roomId){
        try{
            joinService.savePurchaseComp(roomId);
        } catch (Exception e){
            return ResponseEntity.ok().body(new ApiResponse(409, "DB 저장 실패", null));
        }
        Long sellerNo;
        try{
            sellerNo = joinService.getSellerNo(roomId);
        } catch (Exception e){
            return ResponseEntity.ok().body(new ApiResponse(410, "sellerNo 가져오기 실패", null));
        }

        PurchaseCompVO purchaseCompVO = new PurchaseCompVO();
        try{
            purchaseCompVO = joinService.getCompInfo(roomId);
        } catch (Exception e){
            return ResponseEntity.ok().body(new ApiResponse(411, "Response 데이터 가져오기 실패", null));
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