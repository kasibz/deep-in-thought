package com.ted.DeepInThought.service;

import com.ted.DeepInThought.dto.ContractRequest;
import com.ted.DeepInThought.dto.OwnerRequest;
import com.ted.DeepInThought.model.Contract;
import com.ted.DeepInThought.model.Owner;
import com.ted.DeepInThought.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

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

    public Contract editContract(String id, ContractRequest contractRequest) {
        Optional<Contract> contractData = contractRepo.findById(id);

        if (contractData.isPresent()) {
            Contract existingContract = contractData.get();

            if (contractRequest.getLength() != null) {
                existingContract.setLength(contractRequest.getLength());
            }
            if (contractRequest.getStartDate() != null) {
                existingContract.setStartDate(contractRequest.getStartDate());
            }
            if (contractRequest.getStopDate() != null) {
                existingContract.setStopDate(contractRequest.getStopDate());
            }
            if (contractRequest.getRent() != null) {
                existingContract.setRent(contractRequest.getRent());
            }

            return contractRepo.save(existingContract); // Save the updated contract and return it
        } else {
            throw new Error("Contract not found with id: " + id);
        }
    }

}
