package com.ted.DeepInThought.service;

import com.ted.DeepInThought.model.CreditCard;
import com.ted.DeepInThought.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreditCardService extends BaseService<CreditCard, String>{

    @Autowired
    public CreditCardService(CreditCardRepository creditCardRepository) {
        super(creditCardRepository);
    }
}
