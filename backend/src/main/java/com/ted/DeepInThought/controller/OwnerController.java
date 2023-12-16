package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.dto.OwnerRequest;
import com.ted.DeepInThought.model.Owner;
import com.ted.DeepInThought.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
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
