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
    public interface PaymentsByPropertyId {
        String getId();
        LocalDate getDate_paid();
        LocalDate getDate_due();
        Long getAmount();
        String getFirst_name();
        String getLast_name();
        String getType();
    }

    public interface PaymentsByTenantId {
        String getId();
        LocalDate getDate_paid();
        LocalDate getDate_due();
        Long getAmount_paid();
        String getFirst_name();
        String getLast_name();
        String getType();
        Long getCard_number();
        LocalDate getStart_date();
        LocalDate getStop_date();
        Long getRent_due();
    }

    // get the associations
    @Query(value = "SELECT PAYMENT.ID, PAYMENT.DATE_PAID, PAYMENT.DATE_DUE, PAYMENT.AMOUNT, CREDITCARD.TYPE, TENANT.FIRST_NAME, TENANT.LAST_NAME FROM PAYMENT JOIN CREDITCARD ON PAYMENT.CREDIT_CARD_ID = CREDITCARD.ID JOIN TENANT ON CREDITCARD.TENANT_ID = TENANT.ID WHERE TENANT.PROPERTY_ID = :propertyId", nativeQuery = true)
    List<PaymentsByPropertyId> findAllPaymentsByProperty(@Param("propertyId") String id);

    @Query(value ="SELECT PAYMENT.ID, PAYMENT.DATE_PAID, PAYMENT.DATE_DUE, PAYMENT.AMOUNT AS AMOUNT_PAID, CREDITCARD.TYPE, CREDITCARD.CARD_NUMBER, TENANT.FIRST_NAME, TENANT.LAST_NAME, CONTRACT.START_DATE, CONTRACT.STOP_DATE, CONTRACT.RENT AS RENT_DUE FROM PAYMENT JOIN CREDITCARD ON PAYMENT.CREDIT_CARD_ID = CREDITCARD.ID JOIN TENANT ON CREDITCARD.TENANT_ID = TENANT.ID JOIN CONTRACT ON TENANT.CONTRACT_ID = CONTRACT.ID WHERE TENANT.ID = :tenantId", nativeQuery = true)
    List<PaymentsByTenantId> findAllPaymentsByTenantId(@Param("tenantId") String id);
}
