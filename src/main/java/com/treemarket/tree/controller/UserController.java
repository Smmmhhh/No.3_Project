package com.treemarket.tree.controller;

import com.treemarket.tree.common.ApiResponse;
import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.dto.User.EditRequest;
import com.treemarket.tree.dto.User.EditResponse;
import com.treemarket.tree.dto.User.LoginRequest;
import com.treemarket.tree.dto.User.RegisterRequest;
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

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest loginRequest, HttpSession session) {    //로그인 페이지

        UserVO user = userService.login(loginRequest.getUserId(), loginRequest.getUserPw());

        if (user == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(409, "로그인 실패", null));        }
        session.setAttribute("userInfo", user);
        return ResponseEntity.ok().body(new ApiResponse(200, "로그인 성공", user));

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
            UserVO saveuser = userService.findUserByUserId(userVO.getUserId());
            if(saveuser.getUserNo() == null){
                return ResponseEntity.ok().body(new ApiResponse(409, "userNo 생성 오류", null));
            }

            return ResponseEntity.ok().body(new ApiResponse(200, "회원가입 성공", saveuser));
        }
    }

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

}

