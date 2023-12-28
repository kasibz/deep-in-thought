package com.ted.DeepInThought.service;

import com.ted.DeepInThought.dto.OwnerRequest;
import com.ted.DeepInThought.model.Contract;
import com.ted.DeepInThought.model.Owner;
import com.ted.DeepInThought.model.Tenant;
import com.ted.DeepInThought.repository.OwnerRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

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

    BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

    public Owner save(Owner owner) {
        // check if email is unique
        Optional<Owner> ownerData = ownerRepo.findByEmail(owner.getEmail());
        if (ownerData.isPresent()) {
            throw new DuplicateKeyException(owner.getEmail() + " owner already exists");
        }
        Owner newOwner = new Owner();
        String uuid = UUID.randomUUID().toString();
        newOwner.setId(uuid);
        newOwner.setFirstName(owner.getFirstName());
        newOwner.setLastName(owner.getLastName());

        // hash password
        String hash = bcrypt.encode(owner.getPassword());
        newOwner.setPassword(hash);

        newOwner.setEmail(owner.getEmail());
        newOwner.setPhoneNumber(owner.getPhoneNumber());

        return ownerRepo.save(newOwner);
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
                String hash = bcrypt.encode(ownerRequest.getPassword());
                existingOwner.setPassword(hash);
            }
            if (ownerRequest.getPhoneNumber() != null) {
                existingOwner.setPhoneNumber(ownerRequest.getPhoneNumber());
            }
            if (ownerRequest.getEmail() != null) {
                Optional<Owner> ownerEmailData = ownerRepo.findByEmail(ownerRequest.getEmail());

                if (ownerEmailData.isPresent()) {
                    Owner existingEmailOwner = ownerEmailData.get();
                    if (!existingEmailOwner.getId().equals(id)) {
                        throw new DuplicateKeyException("User already exists with that email");
                    }

                }
                existingOwner.setEmail(ownerRequest.getEmail());

            }

            return ownerRepo.save(existingOwner); // Save the updated owner and return it
        }
        throw new EntityNotFoundException("Owner not found with id: " + id);

    }

    public Owner getByEmail(String email) {
        Optional<Owner> ownerData = ownerRepo.findByEmail(email);

        if (ownerData.isPresent()) {
            return ownerData.get();
        }
        throw new EntityNotFoundException("Owner not found with email " + email);
    }

    public Map<String, String> validateByEmail(OwnerRequest ownerRequest) {
        Map<String, String> responseBody = new HashMap<>();
        Optional<Owner> ownerData = ownerRepo.findByEmail(ownerRequest.getEmail());

        if (ownerData.isPresent()) {
            Owner existingOwner = ownerData.get();

            if (bcrypt.matches(ownerRequest.getPassword(), existingOwner.getPassword())) {
                responseBody.put("message", "User is authenticated");
                responseBody.put("ownerId", existingOwner.getId());
                return responseBody;
            }
        }
        throw new EntityNotFoundException("Incorrect email or password");
    }
}
