package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.dto.CreditCardRequest;
import com.ted.DeepInThought.model.CreditCard;
import com.ted.DeepInThought.service.CreditCardService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/creditcard")
public class CreditCardController extends BaseController<CreditCard, String> {

    @Autowired
    private CreditCardService creditCardService;

    @Autowired
    public CreditCardController(CreditCardService creditCardService) {
        super(creditCardService);
    }

    @GetMapping("/tenant/{id}")
    public ResponseEntity<List<CreditCard>> getAllByTenantId(@PathVariable String id) {
        try {
            List<CreditCard> creditCardList = creditCardService.getAllbyTenantId(id);
            return new ResponseEntity<>(creditCardList, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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

    @PutMapping("/{id}")
    public ResponseEntity<CreditCard> updateCreditCard(@PathVariable String id, @RequestBody CreditCardRequest creditCardRequest) {
        try {
            CreditCard updatedCreditCard = creditCardService.editCreditCard(id, creditCardRequest);
            return new ResponseEntity<>(updatedCreditCard, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
