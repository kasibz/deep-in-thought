package com.ted.DeepInThought.service;

import com.ted.DeepInThought.model.Tenant;
import com.ted.DeepInThought.repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TenantService extends BaseService<Tenant, String>{

    @Autowired
    private TenantRepository tenantRepo;

    @Autowired
    public TenantService(TenantRepository tenantRepository) {
        super(tenantRepository);
    }
}
