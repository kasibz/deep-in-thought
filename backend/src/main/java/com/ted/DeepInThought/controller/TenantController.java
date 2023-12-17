package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.dto.TenantRequest;
import com.ted.DeepInThought.model.Tenant;
import com.ted.DeepInThought.service.TenantService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

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
        } catch (EntityNotFoundException e) {
            MultiValueMap<String, String> headers = new HttpHeaders();
            headers.add("error", e.getMessage());
            return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
        } catch (DuplicateKeyException e) {
            MultiValueMap<String, String> headers = new HttpHeaders();
            headers.add("error", e.getMessage());
            return new ResponseEntity<>(headers, HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Tenant> getByEmail(@PathVariable String email) {
        try {
            Tenant existingTenant = tenantService.getByEmail(email);
            return new ResponseEntity<>(existingTenant, HttpStatus.OK);
        } catch (Error e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
