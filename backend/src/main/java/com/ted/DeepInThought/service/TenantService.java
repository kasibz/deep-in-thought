package com.ted.DeepInThought.service;

import com.ted.DeepInThought.dto.TenantRequest;
import com.ted.DeepInThought.model.Contract;
import com.ted.DeepInThought.model.Property;
import com.ted.DeepInThought.model.Tenant;
import com.ted.DeepInThought.repository.ContractRepository;
import com.ted.DeepInThought.repository.PropertyRepository;
import com.ted.DeepInThought.repository.TenantRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TenantService extends BaseService<Tenant, String>{

    @Autowired
    private TenantRepository tenantRepo;

    @Autowired
    private PropertyRepository propertyRepo;

    @Autowired
    private ContractRepository contractRepo;

    @Autowired
    public TenantService(TenantRepository tenantRepository) {
        super(tenantRepository);
    }

    public Tenant saveFromTenantDTO(TenantRequest tenantRequest) {
        // check if email is unique
        Optional<Tenant> tenantData = tenantRepo.findByEmail(tenantRequest.getEmail());
        if (tenantData.isPresent()) {
            throw new DuplicateKeyException(tenantRequest.getEmail() + " tenant already exists");
        }

        Optional<Property> propertyData = propertyRepo.findById(tenantRequest.getPropertyId());
        Optional<Contract> contractData = contractRepo.findById(tenantRequest.getContractId());

        if (propertyData.isEmpty()) {
            throw new EntityNotFoundException("Property not found with id: " + tenantRequest.getPropertyId());
        }

        if (contractData.isEmpty()) {
            throw new EntityNotFoundException("Contract not found with id: " + tenantRequest.getContractId());
        }

        Property existingProperty = propertyData.get();
        Contract existingContract = contractData.get();

        Tenant newTenant = new Tenant();
        String uuid = UUID.randomUUID().toString();
        newTenant.setId(uuid);
        newTenant.setFirstName(tenantRequest.getFirstName());
        newTenant.setLastName(tenantRequest.getLastName());
        newTenant.setPassword(tenantRequest.getPassword());
        newTenant.setEmail(tenantRequest.getEmail());
        newTenant.setPhoneNumber(tenantRequest.getPhoneNumber());
        newTenant.setProperty(existingProperty);
        newTenant.setContract(existingContract);

        return tenantRepo.save(newTenant);
    }

    public Tenant getByEmail(String email) {
        Optional<Tenant> tenantData = tenantRepo.findByEmail(email);

        if (tenantData.isPresent()) {
            return tenantData.get();
        }
        throw new Error("Tenant not found with email " + email);
    }
}
