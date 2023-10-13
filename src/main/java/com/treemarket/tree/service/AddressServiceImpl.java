package com.treemarket.tree.service;

import com.treemarket.tree.domain.AddressVO;
import com.treemarket.tree.mapper.AddressMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressMapper addressMapper;

    @Override
    public Long getAddressId(String inputAddress) {
        AddressVO addressVO = parseAddress(inputAddress);

        if (addressVO == null) {
            return null; // 잘못된 주소 형식
        }

        return addressMapper.getAddressId(addressVO);
    }

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

}
