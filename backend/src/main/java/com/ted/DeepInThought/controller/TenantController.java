package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.dto.OwnerRequest;
import com.ted.DeepInThought.dto.TenantRequest;
import com.ted.DeepInThought.model.Owner;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> validateTenant(@RequestBody TenantRequest tenantRequest) {
        try {
            return new ResponseEntity<>(tenantService.validateByEmail(tenantRequest), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("message", e.getMessage());
            return new ResponseEntity<>(errorMap, HttpStatus.NOT_FOUND);
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

    @GetMapping("/property/{id}")
    public ResponseEntity<List<Tenant>> getByPropertyId(@PathVariable String id) {
        try {
            return new ResponseEntity<>(tenantService.getAllByPropertyId(id), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
