/*
package com.treemarket.tree.controller;

import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.service.AddressService;
import com.treemarket.tree.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AddressService addressService;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody UserVO userVO) {

        String inputAddress = userVO.getUserAddress();

        Long addressId = addressService.getAddressId(inputAddress);

        if(addressId == null){
            return ResponseEntity.badRequest().body("주소를 찾을 수 없음");
        }

        //uservo에 주소id 할당
        userVO.setUserAddress(String.valueOf(addressId));

        boolean isIdUnique = userService.getUserId(userVO.getUserId());
        boolean isNicknameUnique  = userService.getUserNickname(userVO.getUserNickname());

        if (!isIdUnique && !isNicknameUnique) {
            return ResponseEntity.badRequest().body("ID와 닉네임 중복");
        } else if (!isIdUnique) {
            return ResponseEntity.badRequest().body("ID 중복");
        } else if (!isNicknameUnique) {
            return ResponseEntity.badRequest().body("닉네임 중복");
        } else {
            userService.saveUser(userVO);
            return ResponseEntity.ok("회원가입 성공");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UserVO userVO, HttpSession session) {    //로그인 페이지

        UserVO user = userService.login(userVO.getUserId(), userVO.getUserPw());

        if (user == null) {
            return ResponseEntity.badRequest().body("로그인 실패");
        }
        session.setAttribute("userInfo", user);

        return ResponseEntity.ok().body("로그인 성공");
    }

    @PutMapping("/mypage/users/{userNo}")
    public ResponseEntity<Object> editUser(@PathVariable Long userNo, @RequestBody UserVO userVO){
        UserVO user = userService.getUserNo(userNo);

        if(user == null){
            return ResponseEntity.notFound().build();
        }

        String inputAddress = userVO.getUserAddress();
        Long addressId = addressService.getAddressId(inputAddress);
        if(addressId == null){
            return ResponseEntity.badRequest().body("주소를 찾을 수 없음");
        }
        user.setUserAddress(String.valueOf(addressId));

        user.setUserPw(userVO.getUserPw());
        user.setUserName(userVO.getUserName());
        user.setUserNickname(userVO.getUserNickname());
        user.setUserPhoneno(userVO.getUserPhoneno());

        userService.editUser(user);

        return ResponseEntity.ok("사용자 정보 업데이트 성공");

    }

    @DeleteMapping("/mypage/users/{userNo}")
    public ResponseEntity<Object> removeUser(@PathVariable Long userNo){
        userService.removeUser(userNo);
        return ResponseEntity.ok("사용자 탈퇴 완료");
    }
}*/
