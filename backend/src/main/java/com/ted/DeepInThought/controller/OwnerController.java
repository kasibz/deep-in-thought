package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.model.Owner;
import com.ted.DeepInThought.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class OwnerController {

    @Autowired
    private OwnerRepository ownerRepo;

    @GetMapping("/owner")
    public ResponseEntity<List<Owner>> getAllOwners() {
        try {
            List<Owner> ownerList = new ArrayList<>();
            ownerRepo.findAll().forEach(ownerList::add);

            if (ownerList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(ownerList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
