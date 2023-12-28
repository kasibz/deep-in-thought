package com.ted.DeepInThought.service;

import com.ted.DeepInThought.dto.TenantRequest;
import com.ted.DeepInThought.model.Contract;
import com.ted.DeepInThought.model.Owner;
import com.ted.DeepInThought.model.Property;
import com.ted.DeepInThought.model.Tenant;
import com.ted.DeepInThought.repository.ContractRepository;
import com.ted.DeepInThought.repository.PropertyRepository;
import com.ted.DeepInThought.repository.TenantRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.*;

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
        // no longer need to assign a property or contract at creation

        Tenant newTenant = new Tenant();
        String uuid = UUID.randomUUID().toString();
        newTenant.setId(uuid);
        newTenant.setFirstName(tenantRequest.getFirstName());
        newTenant.setLastName(tenantRequest.getLastName());
        // hash password
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        String hash = bcrypt.encode(tenantRequest.getPassword());
        newTenant.setPassword(hash);

        newTenant.setEmail(tenantRequest.getEmail());
        newTenant.setPhoneNumber(tenantRequest.getPhoneNumber());

        return tenantRepo.save(newTenant);
    }

    public Tenant getByEmail(String email) {
        Optional<Tenant> tenantData = tenantRepo.findByEmail(email);

        if (tenantData.isPresent()) {
            return tenantData.get();
        }
        throw new EntityNotFoundException("Tenant not found with email " + email);
    }

    public Tenant editTenant(String id, TenantRequest tenantRequest) {
        Optional<Tenant> tenantData = tenantRepo.findById(id);

        if (tenantData.isPresent()) {
            Tenant existingTenant = tenantData.get();

            if (tenantRequest.getFirstName() != null) {
                existingTenant.setFirstName(tenantRequest.getFirstName());
            }
            if (tenantRequest.getLastName() != null) {
                existingTenant.setLastName(tenantRequest.getLastName());
            }
            if (tenantRequest.getPassword() != null) {
                existingTenant.setPassword(tenantRequest.getPassword());
            }
            if (tenantRequest.getPhoneNumber() != null) {
                existingTenant.setPhoneNumber(tenantRequest.getPhoneNumber());
            }
            if (tenantRequest.getEmail() != null) {
                Optional<Tenant> tenantEmailData = tenantRepo.findByEmail(tenantRequest.getEmail());

                if (tenantEmailData.isPresent()) {
                    Tenant existingEmailTenant = tenantEmailData.get();
                    if (!existingEmailTenant.getId().equals(id)) {
                        throw new DuplicateKeyException("User already exists with that email");
                    }

                }
                existingTenant.setEmail(tenantRequest.getEmail());

            }
            if (tenantRequest.getPropertyId() != null) {
                Optional<Property> propertyData = propertyRepo.findById(tenantRequest.getPropertyId());
                if (propertyData.isPresent()) {
                    Property existingProperty = propertyData.get();
                    existingTenant.setProperty(existingProperty);
                }
            }
            if (tenantRequest.getContractId() != null) {
                Optional<Contract> contractData = contractRepo.findById(tenantRequest.getContractId());
                if (contractData.isPresent()) {
                    Contract existingContract = contractData.get();
                    existingTenant.setContract(existingContract);
                }
            }

            return tenantRepo.save(existingTenant);
        }
        throw new EntityNotFoundException("Tenant does not exist");
    }


    public Map<String, String> validateByEmail(TenantRequest tenantRequest) {
        Map<String, String> responseBody = new HashMap<>();
        Optional<Tenant> tenantData = tenantRepo.findByEmail(tenantRequest.getEmail());

        if (tenantData.isPresent()) {
            Tenant existingTenant = tenantData.get();

            if (tenantRequest.getPassword().equals(existingTenant.getPassword())) {
                responseBody.put("message", "User is authenticated");
                responseBody.put("tenantId", existingTenant.getId());
                return responseBody;
            }
        }
        throw new EntityNotFoundException("Incorrect email or password");
    }

    public List<Tenant> getAllByPropertyId(String propertyId) {
        List<Tenant> tenantList = new ArrayList<>();
        tenantRepo.findByPropertyId(propertyId).forEach(tenantList::add);
        return tenantList;
    }

    // retrieving an associated contract with a tenant
    public TenantRepository.TenantWithContract getContractByTenantId(String tenantId) {
        TenantRepository.TenantWithContract tenantWithContract = tenantRepo.findContractByTenantId(tenantId);
        if (tenantWithContract != null) {
            return tenantWithContract;
        }
        throw new EntityNotFoundException("No Contract found for Tenant with Id " + tenantId);
    }
}
