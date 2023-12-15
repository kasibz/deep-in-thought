package com.ted.DeepInThought.service;

import com.ted.DeepInThought.model.Owner;
import com.ted.DeepInThought.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OwnerService {

    @Autowired
    private OwnerRepository ownerRepo;

    public List<Owner> getAllOwners() {
        List<Owner> ownerList = new ArrayList<>();
        ownerRepo.findAll().forEach(ownerList::add);
        return ownerList;
    }

    public Owner addOwner(Owner newOwner) {
        return ownerRepo.save(newOwner);
    }
}
