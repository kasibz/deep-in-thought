package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.model.CreditCard;
import com.ted.DeepInThought.service.CreditCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/creditcard")
public class CreditCardController extends BaseController<CreditCard, String> {

    @Autowired
    private CreditCardService creditCardService;

    @Autowired
    public CreditCardController(CreditCardService creditCardService) {
        super(creditCardService);
    }

}
