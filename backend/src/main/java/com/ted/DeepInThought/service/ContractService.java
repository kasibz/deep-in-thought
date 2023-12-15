package com.ted.DeepInThought.service;

import com.ted.DeepInThought.model.Contract;
import com.ted.DeepInThought.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractService extends BaseService<Contract, String> {

    @Autowired
    public ContractService(ContractRepository contractRepository) {
        super(contractRepository);
    }

    // add edit function after testing other routes
}
