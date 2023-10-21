package com.treemarket.tree.controller;

import com.treemarket.tree.common.ApiResponse;
import com.treemarket.tree.domain.ProductPostVO;
import com.treemarket.tree.dto.Productpost.req.AdminPostUpdateReq;
import com.treemarket.tree.dto.Productpost.res.AdminProductPostList;
import com.treemarket.tree.dto.Productpost.res.ProductAllBoardResponse;
import com.treemarket.tree.dto.User.AdminUserList;
import com.treemarket.tree.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin/*")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final JoinService joinService;
    private final ProductPostService productPostService;
    private final AwsS3ServiceImpl awsS3Service;
    private final AddressService addressService;

    @GetMapping("/user")
    public ResponseEntity<ApiResponse> getAllUsers() {
//        List<ProductPostVO> productPostVOList = productPostService.getAllBoards();
//        // 리스트가 비어있을 경우
//        if (productPostVOList.isEmpty())
//            return ResponseEntity.ok().body(ApiResponse.builder().status(400).message("리스트없음").build());
//        return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("성공").data(productPostVOList).build());
        List<AdminUserList> adminUserList = joinService.getAllUsers();

        // 리스트가 비어있을 경우
        if (adminUserList.isEmpty())
            return ResponseEntity.ok().body(ApiResponse.builder().status(400).message("리스트없음").build());
        return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("성공").data(adminUserList).build());
    }

    @GetMapping("/post")
    public ResponseEntity<ApiResponse> getAllBoards() {
        List<AdminProductPostList> adminProductPostList = joinService.getAllBoards();

        for (int i = 0; i < adminProductPostList.size(); i++) {
            adminProductPostList.get(i).setImage(
                    productPostService.parseAddress(adminProductPostList.get(i).getImage()).get(0));
        }

        // 리스트가 비어있을 경우
        if (adminProductPostList.isEmpty())
            return ResponseEntity.ok().body(ApiResponse.builder().status(400).message("리스트없음").build());
        return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("성공").data(adminProductPostList).build());
    }

    @PutMapping("/post")
    public ResponseEntity<ApiResponse> updatePostStatus(@RequestBody AdminPostUpdateReq adminPostUpdateReq) {

        // AdminPostUpdateReq 객체 생성 후 상태수정 메서드 실행
        AdminPostUpdateReq adminPostUpdate = AdminPostUpdateReq.builder()
                .postId(adminPostUpdateReq.getPostId())
                .productStatus(adminPostUpdateReq.getProductStatus())
                .build();

        try {
            // 게시글 상태 수정 메서드
            productPostService.updatePostStatus(adminPostUpdate);
            // 수정한 게시글 정보 가져오는 메서드
            ProductPostVO productPostVO = productPostService.getPostDetails(adminPostUpdateReq.getPostId());

            return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("게시글 상태 수정 성공").data(productPostVO).build());
        } catch (Exception e) {
            return ResponseEntity.ok().body(ApiResponse.builder().status(400).message("게시글 상태 수정 실패").build());
        }

    }

}
