package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.model.Contract;
import com.ted.DeepInThought.model.Tenant;
import com.ted.DeepInThought.service.ContractService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
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
