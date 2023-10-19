package com.treemarket.tree.common;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExtendedApiResponse extends ApiResponse {
    private int totalPage;

    @Builder(builderMethodName = "extendedApiResponseBuilder")
    public ExtendedApiResponse(int status, String message, Object data, int totalPage) {
        super(status, message, data);
        this.totalPage = totalPage;
    }
}