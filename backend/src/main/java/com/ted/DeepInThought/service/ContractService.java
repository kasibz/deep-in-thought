package com.ted.DeepInThought.service;

import com.ted.DeepInThought.model.Contract;
import com.ted.DeepInThought.repository.ContractRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContractService extends BaseService<Contract, String> {

    @Autowired
    private ContractRepository contractRepo;

    @Autowired
    public ContractService(ContractRepository contractRepository) {
        super(contractRepository);
    }
    // add edit function after testing other routes

    public Contract save(Contract contract) {
        return contractRepo.save(contract);
    }

}
