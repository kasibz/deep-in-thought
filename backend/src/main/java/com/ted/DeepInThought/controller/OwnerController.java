package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.model.Owner;
import com.ted.DeepInThought.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/owner")
public class OwnerController extends BaseController<Owner, String> {

    // eventually, PUT method will need to be custom here by use of the instantiated
    // OwnerService, but that service also needs the logic for this PUT request
    // by use of a DTO
    @Autowired
    public OwnerController(OwnerService ownerService) {
        super(ownerService);
    }

    // call the service and incorporate the DTO


}
