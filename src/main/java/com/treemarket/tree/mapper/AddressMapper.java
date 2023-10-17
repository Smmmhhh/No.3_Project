package com.treemarket.tree.mapper;

import com.treemarket.tree.domain.AddressVO;
import com.treemarket.tree.domain.ProductPostVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AddressMapper {
    Long getAddressId(AddressVO addressVO);
    AddressVO getAddressName(Long addressId);
}
