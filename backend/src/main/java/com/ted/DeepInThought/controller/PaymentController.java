package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.dto.OwnerRequest;
import com.ted.DeepInThought.dto.PaymentRequest;
import com.ted.DeepInThought.model.Owner;
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
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/property/{id}")
    public ResponseEntity<List<PaymentRepository.PaymentsByPropertyId>> getAllPaymentsByProperty(@PathVariable String id) {
        try {
            return new ResponseEntity<>(paymentService.getAllPaymentsByPropertyId(id), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/tenant/{id}")
    public ResponseEntity<List<PaymentRepository.PaymentsByTenantId>> getAllPaymentsByTenant(@PathVariable String id) {
        try {
            return new ResponseEntity<>(paymentService.getAllPaymentsByTenant(id), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable String id, @RequestBody PaymentRequest paymentRequest) {
        try {
            Payment updatedPayment = paymentService.editPayment(id, paymentRequest);
            return new ResponseEntity<>(updatedPayment, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
