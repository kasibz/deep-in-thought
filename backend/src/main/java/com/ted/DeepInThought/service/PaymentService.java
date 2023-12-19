package com.ted.DeepInThought.service;

import com.ted.DeepInThought.dto.PaymentRequest;
import com.ted.DeepInThought.model.CreditCard;
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

    public List<PaymentRepository.PaymentWithAssociations> getAllPaymentsByPropertyId(String propertyId) {
        List<PaymentRepository.PaymentWithAssociations> paymentList = paymentRepo.findAllPaymentsByProperty(propertyId);
        if(!paymentList.isEmpty()) {
            return paymentList;
        }
        throw new EntityNotFoundException("No Payments for this property");
    }
}
