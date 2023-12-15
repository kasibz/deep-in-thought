package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.model.Tenant;
import com.ted.DeepInThought.service.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
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

}
