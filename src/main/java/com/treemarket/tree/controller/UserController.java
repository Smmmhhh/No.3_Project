package com.treemarket.tree.controller;

import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userservice;

    @PostMapping("/users/register")
    public ResponseEntity<Object> registerUser(@RequestBody UserVO uservo) {
        boolean isIdUnique = userservice.checkId(uservo.getUserId());
        boolean isNicknameUnique  = userservice.checkNickname(uservo.getUserNickname());

        if (!isIdUnique && !isNicknameUnique) {
            return ResponseEntity.badRequest().body("ID와 닉네임 중복");
        } else if (!isIdUnique) {
            return ResponseEntity.badRequest().body("ID 중복");
        } else if (!isNicknameUnique) {
            return ResponseEntity.badRequest().body("닉네임 중복");
        } else {
            userservice.saveUser(uservo);
            return ResponseEntity.ok("회원가입 성공");
        }
    }
}
