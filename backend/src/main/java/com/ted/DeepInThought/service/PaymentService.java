package com.ted.DeepInThought.service;

import com.ted.DeepInThought.model.Payment;
import com.ted.DeepInThought.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService extends BaseService<Payment, String> {

    // Need this later for implementing a custom POST and PUT
    // I think I'll need to override the POST(save)
    @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        super(paymentRepository);
    }
}
