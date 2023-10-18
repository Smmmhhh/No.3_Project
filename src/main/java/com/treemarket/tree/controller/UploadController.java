package com.treemarket.tree.controller;


import com.treemarket.tree.dto.Productpost.req.ProductsPostRequest;
import com.treemarket.tree.service.AwsS3ServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/upload")
public class UploadController {

    private final AwsS3ServiceImpl awsS3Service;

    @PostMapping
    public ResponseEntity<List<String>> uploadFile(
            @RequestPart("multipartFiles") List<MultipartFile> multipartFiles,
            @RequestPart("productsPostRequest") ProductsPostRequest productsPostRequest) throws IOException {

        System.out.println("컨트롤러" +  productsPostRequest.getAddressName());
        System.out.println("컨트롤러" +  productsPostRequest.getDetails());
        System.out.println("컨트롤러" +  productsPostRequest.getTitle());
        System.out.println("컨트롤러" +  productsPostRequest.getPrice());
        System.out.println("컨트롤러" +  productsPostRequest.getUserNo());
        System.out.println("컨트롤러" +  productsPostRequest.getCtgName());


        return ResponseEntity.ok(awsS3Service.uploadFile(multipartFiles));
    }

    @DeleteMapping("/deleteFile")
    public ResponseEntity<String> deleteFile(@RequestParam String fileName){
        awsS3Service.deleteFile(fileName);
        return ResponseEntity.ok(fileName);
    }

}
