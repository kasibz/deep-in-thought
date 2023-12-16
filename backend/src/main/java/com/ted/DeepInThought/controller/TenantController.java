package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.dto.TenantRequest;
import com.ted.DeepInThought.model.Tenant;
import com.ted.DeepInThought.service.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tenant")
public class TenantController extends BaseController<Tenant, String> {

    @Autowired
    private TenantService tenantService;

    @Autowired
    public TenantController(TenantService tenantService) {
        super(tenantService);
    }

    @PostMapping
    public ResponseEntity<Tenant> create(@RequestBody TenantRequest tenantRequest) {
        try {
            Tenant newTenant = tenantService.saveFromTenantDTO(tenantRequest);
            return new ResponseEntity<>(newTenant, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
