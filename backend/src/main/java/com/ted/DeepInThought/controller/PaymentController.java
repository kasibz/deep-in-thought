package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.model.Payment;
import com.ted.DeepInThought.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
public class PaymentController extends BaseController<Payment, String> {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        super(paymentService);
    }

}
