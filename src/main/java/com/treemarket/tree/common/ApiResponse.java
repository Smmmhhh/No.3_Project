package com.treemarket.tree.common;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ApiResponse {
    private int status; //상태코드
    private String message;  //응답 메시지
    private Object data;    //응답 데이터

    @Builder
    public ApiResponse(int status, String message, Object data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
