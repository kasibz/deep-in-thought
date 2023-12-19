package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.dto.PaymentRequest;
import com.ted.DeepInThought.model.Payment;
import com.ted.DeepInThought.repository.PaymentRepository;
import com.ted.DeepInThought.service.PaymentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/payment")
public class PaymentController extends BaseController<Payment, String> {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        super(paymentService);
    }

    @PostMapping
    public ResponseEntity<Payment> create(@RequestBody PaymentRequest paymentRequest) {
        try {
            Payment newPayment = paymentService.saveFromPaymentDTO(paymentRequest);
            return new ResponseEntity<>(newPayment, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/property/{id}")
    public ResponseEntity<List<PaymentRepository.PaymentWithAssociations>> getAllPaymentsByProperty(@PathVariable String id) {
        try {
            return new ResponseEntity<>(paymentService.getAllPaymentsByPropertyId(id), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
