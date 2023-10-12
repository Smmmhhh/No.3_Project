package com.treemarket.tree.service;

import com.treemarket.tree.domain.AddressVO;
import com.treemarket.tree.mapper.AddressMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService{

    @Autowired
    private AddressMapper addressmapper;

    @Override
    public Long getAddressId(AddressVO addressVO) {
        return addressmapper.getAddressId(addressVO);
    }
}
