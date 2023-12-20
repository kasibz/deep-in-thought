package com.ted.DeepInThought.repository;

import com.ted.DeepInThought.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {

    // need a return that combines some tenant fields
    // native queries from snowflake only work with interfaces if you use snake case -_-
    public interface PaymentWithAssociations {
        String getId();
        LocalDate getDate_paid();
        LocalDate getDate_due();
        Long getAmount();
        String getFirst_name();
        String getLast_name();
        String getType();
    }

    // get the associations
    @Query(value = "SELECT PAYMENT.ID, PAYMENT.DATE_PAID, PAYMENT.DATE_DUE, PAYMENT.AMOUNT, CREDITCARD.TYPE, TENANT.FIRST_NAME, TENANT.LAST_NAME FROM PAYMENT JOIN CREDITCARD ON PAYMENT.CREDIT_CARD_ID = CREDITCARD.ID JOIN TENANT ON CREDITCARD.TENANT_ID = TENANT.ID WHERE TENANT.PROPERTY_ID = :propertyId", nativeQuery = true)
    List<PaymentWithAssociations> findAllPaymentsByProperty(@Param("propertyId") String id);
}
