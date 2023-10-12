package com.treemarket.tree.mapper;

import com.treemarket.tree.domain.AddressVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AddressMapper {
    Long getAddressId(AddressVO addressvo);

}
