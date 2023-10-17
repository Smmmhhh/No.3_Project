package com.treemarket.tree.controller;

import com.treemarket.tree.common.ApiResponse;
import com.treemarket.tree.domain.UserVO;

import com.treemarket.tree.dto.User.LoginRequest;
import com.treemarket.tree.dto.User.UserDataResponse;
import com.treemarket.tree.dto.User.RegisterRequest;
import com.treemarket.tree.dto.User.RegisterResponse;
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

        UserVO userVO = userService.login(loginRequest.getUserId(), loginRequest.getUserPw());

        if (userVO == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(409, "로그인 실패", null));
        }

        String addressname = addressService.getAddressName(userVO.getUserAddress());

        UserDataResponse userDataResponse = UserDataResponse.builder()
                .userNo(userVO.getUserNo())
                .userId(userVO.getUserId())
                .userPw(userVO.getUserPw())
                .userAddress(addressname)
                .userName(userVO.getUserName())
                .userNickname(userVO.getUserNickname())
                .userPhoneno(userVO.getUserPhoneno())
                .userGrade(userVO.getUserGrade())
                .userValidity(userVO.getUserValidity())
                .build();

        session.setAttribute("userData", userDataResponse);
        System.out.println("로그인 성공");

        return ResponseEntity.ok().body(new ApiResponse(200, "로그인 성공", userDataResponse));
    }

    @GetMapping ("/logout")
    public ResponseEntity<ApiResponse> logout(HttpSession session) {
        try{
            session.removeAttribute("userData");

            session.invalidate();// 세션 무효화 (옵션)

            System.out.println("로그아웃 성공");
            return ResponseEntity.ok().body(new ApiResponse(200, "로그아웃 성공", null));
        } catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(new ApiResponse(409, "로그아웃 실패", null));
        }
    }


    @PostMapping ("/register")
    @RequestMapping(consumes = "application/json")
    public ResponseEntity<ApiResponse> register(@RequestBody RegisterRequest registerRequest) {

        String inputAddress = registerRequest.getUserAddress();
        Long addressId = addressService.getAddressId(inputAddress);
        if(addressId == null){
            return ResponseEntity.badRequest().body(new ApiResponse(409, "주소를 찾을 수 없음", null));
        }

        boolean isIdUnique = userService.checkId(registerRequest.getUserId());
        boolean isNicknameUnique  = userService.checkNickname(registerRequest.getUserNickname());

        if (!isIdUnique && !isNicknameUnique) {
            return ResponseEntity.badRequest().body(new ApiResponse(410, "ID와 닉네임 중복",null));
        } else if (!isIdUnique) {
            return ResponseEntity.badRequest().body(new ApiResponse(411, "ID 중복",null));
        } else if (!isNicknameUnique) {
            return ResponseEntity.badRequest().body(new ApiResponse(412, "닉네임 중복",null));
        } else {
            UserVO userVO = UserVO.builder()
                    .userId(registerRequest.getUserId())
                    .userPw(registerRequest.getUserPw())
                    .userName(registerRequest.getUserName())
                    .userNickname(registerRequest.getUserNickname())
                    .userAddress(addressId)
                    .userPhoneno(registerRequest.getUserPhoneno())
                    .userGrade("C")
                    .userValidity("1")
                    .build();

            userService.saveUser(userVO);
            UserVO saveUser = userService.findUserByUserId(userVO.getUserId());
            if(saveUser.getUserNo() == null){
                return ResponseEntity.badRequest().body(new ApiResponse(413, "userNo 생성 오류", null));
            }

            RegisterResponse registerResponse = RegisterResponse.builder()
                    .userId(saveUser.getUserId())
                    .userPw(saveUser.getUserPw())
                    .userAddress(registerRequest.getUserAddress())
                    .userName(saveUser.getUserName())
                    .userNickname(saveUser.getUserNickname())
                    .userPhoneno(saveUser.getUserPhoneno())
                    .userGrade(saveUser.getUserGrade())
                    .userValidity(saveUser.getUserValidity())
                    .build();

            return ResponseEntity.ok().body(new ApiResponse(200, "회원가입 성공", registerResponse));
        }
    }

}

/*
*     private String userId;
    private String userAddress;
    private String userPw;
    private String userName;
    private String userNickname;
    private String userPhoneno;
    private String userGrade;
    private String userValidity;*/