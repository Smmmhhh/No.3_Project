package com.treemarket.tree.controller;

import com.treemarket.tree.common.ApiResponse;
import com.treemarket.tree.domain.ProductPostVO;
import com.treemarket.tree.dto.Productpost.res.AdminProductPostList;
import com.treemarket.tree.service.JoinService;
import com.treemarket.tree.service.ProductPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/*")
@RequiredArgsConstructor
public class AdminController {

    private final JoinService joinService;

    @GetMapping("/post")
    public ResponseEntity<ApiResponse> getAllBoards() {
        List<AdminProductPostList> adminProductPostList = joinService.getAllBoards();

        // 리스트가 비어있을 경우
        if (adminProductPostList.isEmpty())
            return ResponseEntity.ok().body(ApiResponse.builder().status(400).message("리스트없음").build());
        return ResponseEntity.ok().body(ApiResponse.builder().status(200).message("성공").data(adminProductPostList).build());
    }



}
