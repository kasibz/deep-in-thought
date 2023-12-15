package com.ted.DeepInThought.service;

import com.ted.DeepInThought.dto.OwnerRequest;
import com.ted.DeepInThought.model.Owner;
import com.ted.DeepInThought.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OwnerService extends BaseService<Owner, String> {

    @Autowired
    private OwnerRepository ownerRepo;

//    We are extending the base Service and using the super constructor to reuse
//    the baseService methods but doing so with a different repository passed as an argument
    @Autowired
    public OwnerService(OwnerRepository ownerRepository) {
        super(ownerRepository);
    }

    // make the service for all properties here as in the logic
    public Owner editOwner(String id, OwnerRequest ownerRequest) {
        Optional<Owner> ownerData = ownerRepo.findById(id);

        if (ownerData.isPresent()) {
            Owner existingOwner = ownerData.get();

            if (ownerRequest.getFirstName() != null) {
                existingOwner.setFirstName(ownerRequest.getFirstName());
            }
            if (ownerRequest.getLastName() != null) {
                existingOwner.setLastName(ownerRequest.getLastName());
            }
            if (ownerRequest.getPassword() != null) {
                existingOwner.setPassword(ownerRequest.getPassword());
            }
            if (ownerRequest.getPhoneNumber() != null) {
                existingOwner.setPhoneNumber(ownerRequest.getPhoneNumber());
            }

            return ownerRepo.save(existingOwner); // Save the updated owner and return it
        } else {
            throw new Error("Owner not found with id: " + id);
        }
    }
}
