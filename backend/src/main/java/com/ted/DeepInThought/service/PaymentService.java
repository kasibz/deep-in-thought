package com.ted.DeepInThought.service;

import com.ted.DeepInThought.dto.OwnerRequest;
import com.ted.DeepInThought.dto.PaymentRequest;
import com.ted.DeepInThought.model.CreditCard;
import com.ted.DeepInThought.model.Owner;
import com.ted.DeepInThought.model.Payment;
import com.ted.DeepInThought.model.Tenant;
import com.ted.DeepInThought.repository.CreditCardRepository;
import com.ted.DeepInThought.repository.PaymentRepository;
import com.ted.DeepInThought.repository.TenantRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PaymentService extends BaseService<Payment, String> {

    // Need this later for implementing a custom POST and PUT
    // I think I'll need to override the POST(save)
    @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private CreditCardRepository creditCardRepo;

    @Autowired
    private TenantRepository tenantRepo;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        super(paymentRepository);
    }

    public Payment saveFromPaymentDTO(PaymentRequest paymentRequest) {
        Optional<CreditCard> creditCardData = creditCardRepo.findById(paymentRequest.getCreditCardId());

        if (creditCardData.isEmpty()) {
            throw new Error("Credit Card not found with id: " + paymentRequest.getCreditCardId());
        }

        CreditCard existingCreditCard = creditCardData.get();

        Payment newPayment = new Payment();
        String uuid = UUID.randomUUID().toString();
        newPayment.setId(uuid);
        newPayment.setPaid(paymentRequest.isPaid());
        newPayment.setDatePaid(paymentRequest.getDatePaid());
        newPayment.setDateDue(paymentRequest.getDateDue());
        newPayment.setAmount(paymentRequest.getAmount());
        newPayment.setCreditCard(existingCreditCard);

        return paymentRepo.save(newPayment);
    }

    public Payment editPayment(String id, PaymentRequest paymentRequest) {
        Optional<Payment> paymentData = paymentRepo.findById(id);

        if (paymentData.isPresent()) {
            Payment existingPayment = paymentData.get();

            if (paymentRequest.getDatePaid() != null) {
                existingPayment.setDatePaid(paymentRequest.getDatePaid());
            }
            if (paymentRequest.getDateDue() != null) {
                existingPayment.setDateDue(paymentRequest.getDateDue());
            }
            if (paymentRequest.getAmount() != null) {
                existingPayment.setAmount(paymentRequest.getAmount());
            }

            return paymentRepo.save(existingPayment); // Save the updated payment and return it
        } else {
            throw new Error("Payment not found with id: " + id);
        }
    }

    public List<PaymentRepository.PaymentWithAssociations> getAllPaymentsByPropertyId(String propertyId) {
        return paymentRepo.findAllPaymentsByProperty(propertyId);
    }
}
