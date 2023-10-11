package com.treemarket.tree.controller;


// sql쿼리를 가져오기 위해 @Resource 어노테이션을 통해 CategoryService를 의존성 주입
// 의존성 주입을 함으로써 CategoryService 안에 있는 CategoryServiceImple도 딸려 온다.
// 스프링 부트에서는 무조건 ModelAndView 방식을 사용해서 데이터와 경로를 함께 보낸다.

import com.treemarket.tree.domain.CtgTblVo;
import com.treemarket.tree.service.CategoryService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class CategoryController {

    @Resource
    private CategoryService categoryService;

    @GetMapping("/api/hello")
    public List<CtgTblVo> allList() throws Exception {
        List<CtgTblVo> allList = categoryService.getCtgList();
        return allList;
    }



    @RequestMapping(value = "list")
    public ModelAndView allListView(CtgTblVo ctgTblVo) throws Exception {
        ModelAndView mav = new ModelAndView();

        List<CtgTblVo> allList = categoryService.getCtgList();
        //System.out.println("찾아" + allList.get(0).getCtgName());

        mav.addObject("allList", allList);
        mav.setViewName("list");
        return mav;
    }


}
