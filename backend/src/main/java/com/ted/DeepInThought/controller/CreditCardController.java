package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.dto.CreditCardRequest;
import com.ted.DeepInThought.model.CreditCard;
import com.ted.DeepInThought.service.CreditCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping
    public ResponseEntity<CreditCard> create(@RequestBody CreditCardRequest creditCardRequest) {
        try {
            CreditCard newCreditCard = creditCardService.saveFromCreditCardDTO(creditCardRequest);
            return new ResponseEntity<>(newCreditCard, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
