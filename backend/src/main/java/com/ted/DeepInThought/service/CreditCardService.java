package com.ted.DeepInThought.service;

import com.ted.DeepInThought.dto.CreditCardRequest;
import com.ted.DeepInThought.dto.OwnerRequest;
import com.ted.DeepInThought.model.CreditCard;
import com.ted.DeepInThought.model.Owner;
import com.ted.DeepInThought.model.Tenant;
import com.ted.DeepInThought.repository.CreditCardRepository;
import com.ted.DeepInThought.repository.TenantRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
            newCreditCard.setZipcode(creditCardRequest.getZipcode());
            newCreditCard.setTenant(existingTenant);

            return creditCardRepo.save(newCreditCard);
        }
        throw new Error("Tenant not found with id: " + creditCardRequest.getTenantId());
    }

    public CreditCard editCreditCard(String id, CreditCardRequest creditCardRequest) {
        Optional<CreditCard> creditCardData = creditCardRepo.findById(id);

        if (creditCardData.isPresent()) {
            CreditCard existingCreditCard = creditCardData.get();

            if (creditCardRequest.getCardNumber() != null) {
                existingCreditCard.setCardNumber(creditCardRequest.getCardNumber());
            }
            if (creditCardRequest.getCvv() != null) {
                existingCreditCard.setCvv(creditCardRequest.getCvv());
            }
            if (creditCardRequest.getName() != null) {
                existingCreditCard.setName(creditCardRequest.getName());
            }
            if (creditCardRequest.getStreetAddress() != null) {
                existingCreditCard.setStreetAddress(creditCardRequest.getStreetAddress());
            }
            if (creditCardRequest.getCity() != null) {
                existingCreditCard.setCity(creditCardRequest.getCity());
            }
            if (creditCardRequest.getZipcode() != null) {
                existingCreditCard.setZipcode(creditCardRequest.getZipcode());
            }
            if (creditCardRequest.getState() != null) {
                existingCreditCard.setState(creditCardRequest.getState());
            }
            if (creditCardRequest.getType() != null) {
                existingCreditCard.setType(creditCardRequest.getType());
            }

            return creditCardRepo.save(existingCreditCard); // Save the updated credit card and return it
        } else {
            throw new EntityNotFoundException("Credit Card not found with id: " + id);
        }
    }
}
