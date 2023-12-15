package com.ted.DeepInThought.service;

import com.ted.DeepInThought.model.Owner;
import com.ted.DeepInThought.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OwnerService extends BaseService<Owner, String> {

//    We are extending the base Service and using the super constructor to reuse
//    the baseService methods but doing so with a different repository passed as an argument
    @Autowired
    public OwnerService(OwnerRepository ownerRepository) {
        super(ownerRepository);
    }

    // make the service for all properties here as in the logic
}
