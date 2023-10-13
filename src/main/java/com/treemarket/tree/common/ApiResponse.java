package com.treemarket.tree.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {
    private int status; //상태코드
    private String message;  //응답 메시지
    private Object data;    //응답 데이터

}