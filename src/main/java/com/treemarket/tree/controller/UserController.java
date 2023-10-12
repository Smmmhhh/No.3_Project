package com.treemarket.tree.controller;

import com.treemarket.tree.domain.AddressVO;
import com.treemarket.tree.domain.UserVO;
import com.treemarket.tree.service.AddressService;
import com.treemarket.tree.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AddressService addressService;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody UserVO userVO) {

        // 사용자에게 입력받은 주소 문자열 저장
        String inputAddress = userVO.getUserAddress();

        // 입력 주소 문자열 파싱해서 AddressVO로 변환
        AddressVO addressVO = parseAddress(inputAddress);
        if(addressVO == null){
            return ResponseEntity.badRequest().body("잘못된 주소 형식");
        }

        //주소Id 검색
        Long addressId = addressService.getAddressId(addressVO);
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

    // 주소 파싱 메소드
    private AddressVO parseAddress(String inputAddress){

        AddressVO addressVO = new AddressVO();

        // 공백으로 주소 분리
        String[] addressParts = inputAddress.split(" ");

        if(addressParts.length == 3){
            addressVO.setSido(addressParts[0]);
            addressVO.setSigungu(addressParts[1]);
            addressVO.setTown(addressParts[2]);
        } else if(addressParts.length == 4){
            addressVO.setSido(addressParts[0]);
            addressVO.setSigungu(addressParts[1] + " " + addressParts[2]);
            addressVO.setTown(addressParts[3]);
        } else{
            return null;
        }

        return addressVO;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UserVO userVO, HttpSession session) {    //로그인 페이지

        Long id = userService.login(userVO.getUserId(), userVO.getUserPw());

        if (id == null) {
            return ResponseEntity.badRequest().body("로그인 실패");
        }
        session.setAttribute("userId", id);
        return ResponseEntity.ok().body("로그인 성공");
    }
}