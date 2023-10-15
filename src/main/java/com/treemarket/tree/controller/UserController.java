package com.treemarket.tree.controller;

import com.treemarket.tree.common.ApiResponse;
import com.treemarket.tree.domain.UserVO;

import com.treemarket.tree.dto.User.LoginRequest;
import com.treemarket.tree.dto.User.RegisterRequest;
import com.treemarket.tree.service.AddressService;
import com.treemarket.tree.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AddressService addressService;


    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest loginRequest, HttpSession session) {    //로그인 페이지

        UserVO user = userService.login(loginRequest.getUserId(), loginRequest.getUserPw());

        if (user == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(409, "로그인 실패", null));
        }

        session.setAttribute("userInfo", user);
        System.out.println("로그인 성공");

        UserVO uservo = (UserVO) session.getAttribute("userInfo");
        System.out.println(uservo.getUserName());

        return ResponseEntity.ok().body(new ApiResponse(200, "로그인 성공", user));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpSession session) {
        session.removeAttribute("userInfo");
        // 세션 무효화 (옵션)
        // session.invalidate();

        System.out.println("로그아웃 성공");

        return ResponseEntity.ok().body(new ApiResponse(200, "로그아웃 성공", null));
    }


    @PostMapping ("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody RegisterRequest registerRequest) {

        String inputAddress = registerRequest.getUserAddress();
        Long addressId = addressService.getAddressId(inputAddress);
        if(addressId == null){
            return ResponseEntity.badRequest().body(new ApiResponse(409, "주소를 찾을 수 없음", null));
        }

        boolean isIdUnique = userService.checkId(registerRequest.getUserId());
        boolean isNicknameUnique  = userService.checkNickname(registerRequest.getUserNickname());

        if (!isIdUnique && !isNicknameUnique) {
            return ResponseEntity.badRequest().body(new ApiResponse(409, "ID와 닉네임 중복",null));
        } else if (!isIdUnique) {
            return ResponseEntity.badRequest().body(new ApiResponse(409, "ID 중복",null));
        } else if (!isNicknameUnique) {
            return ResponseEntity.badRequest().body(new ApiResponse(409, "닉네임 중복",null));
        } else {
            UserVO userVO = UserVO.builder()
                    .userId(registerRequest.getUserId())
                    .userPw(registerRequest.getUserPw())
                    .userName(registerRequest.getUserName())
                    .userNickname(registerRequest.getUserNickname())
                    .userAddress(addressId)
                    .userPhoneno(registerRequest.getUserPhoneno())
                    .userValidity("1")
                    .build();

            userService.saveUser(userVO);
            UserVO saveUser = userService.findUserByUserId(userVO.getUserId());
            if(saveUser.getUserNo() == null){
                return ResponseEntity.badRequest().body(new ApiResponse(409, "userNo 생성 오류", null));
            }

            return ResponseEntity.ok().body(new ApiResponse(200, "회원가입 성공", saveUser));
        }
    }

}