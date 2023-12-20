package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.dto.OwnerRequest;
import com.ted.DeepInThought.model.Contract;
import com.ted.DeepInThought.model.Owner;
import com.ted.DeepInThought.model.Tenant;
import com.ted.DeepInThought.service.OwnerService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/owner")
public class OwnerController extends BaseController<Owner, String> {

    @Autowired
    private OwnerService ownerService;

    // eventually, PUT method will need to be custom here by use of the instantiated
    // OwnerService, but that service also needs the logic for this PUT request
    // by use of a DTO
    @Autowired
    public OwnerController(OwnerService ownerService) {
        super(ownerService);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Owner> getByEmail(@PathVariable String email) {
        try {
            Owner existingOwner = ownerService.getByEmail(email);
            return new ResponseEntity<>(existingOwner, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Owner> create(@RequestBody Owner owner) {
        try {
            return new ResponseEntity<>(ownerService.save(owner), HttpStatus.CREATED);
        } catch (DuplicateKeyException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // validating on login
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> validateOwner(@RequestBody OwnerRequest ownerRequest) {
        try {
            return new ResponseEntity<>(ownerService.validateByEmail(ownerRequest), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // call the service and incorporate the DTO
    @PutMapping("/{id}")
    public ResponseEntity<Owner> updateOwner(@PathVariable String id, @RequestBody OwnerRequest ownerRequest) {
        try {
            Owner updatedOwner = ownerService.editOwner(id, ownerRequest);
            return new ResponseEntity<>(updatedOwner, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
