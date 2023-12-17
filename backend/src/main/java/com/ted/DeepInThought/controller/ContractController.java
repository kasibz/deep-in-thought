package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.model.Contract;
import com.ted.DeepInThought.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping
    public ResponseEntity<Contract> create(@RequestBody Contract contract) {
        try {
            return new ResponseEntity<>(contractService.save(contract), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
