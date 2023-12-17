package com.ted.DeepInThought.service;

import com.ted.DeepInThought.dto.CreditCardRequest;
import com.ted.DeepInThought.model.CreditCard;
import com.ted.DeepInThought.model.Tenant;
import com.ted.DeepInThought.repository.CreditCardRepository;
import com.ted.DeepInThought.repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class CreditCardService extends BaseService<CreditCard, String>{

    @Autowired
    private CreditCardRepository creditCardRepo;

    @Autowired
    private TenantRepository tenantRepo;

    @Autowired
    public CreditCardService(CreditCardRepository creditCardRepository) {
        super(creditCardRepository);
    }

    public CreditCard saveFromCreditCardDTO(CreditCardRequest creditCardRequest) {
        Optional<Tenant> tenantData = tenantRepo.findById(creditCardRequest.getTenantId());

        if (tenantData.isPresent()) {
            Tenant existingTenant = tenantData.get();

            CreditCard newCreditCard = new CreditCard();
            String uuid = UUID.randomUUID().toString();
            newCreditCard.setId(uuid);
            newCreditCard.setCardNumber(creditCardRequest.getCardNumber());
            newCreditCard.setCvv(creditCardRequest.getCvv());
            newCreditCard.setName(creditCardRequest.getName());
            newCreditCard.setStreetAddress(creditCardRequest.getStreetAddress());
            newCreditCard.setCity(creditCardRequest.getCity());
            newCreditCard.setState(creditCardRequest.getState());
            newCreditCard.setZip(creditCardRequest.getZip());
            newCreditCard.setTenant(existingTenant);

            return creditCardRepo.save(newCreditCard);
        }
        throw new Error("Tenant not found with id: " + creditCardRequest.getTenantId());
    }
}
