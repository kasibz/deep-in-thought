package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.model.Contract;
import com.ted.DeepInThought.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contract")
public class ContractController extends BaseController<Contract, String>{

    @Autowired
    private ContractService contractService;

    @Autowired
    public ContractController(ContractService contractService) {
        super(contractService);
    }

}
