package com.ted.DeepInThought.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "PAYMENT")
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    private String id = UUID.randomUUID().toString();
    private boolean isPaid;
    private LocalDateTime datePaid;
    private LocalDateTime dateDue;
    private Long amount;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "creditCardId", nullable = false)
    @JsonBackReference(value = "payment-creditCard")
    private CreditCard creditCard;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isPaid() {
        return isPaid;
    }

    public void setPaid(boolean paid) {
        isPaid = paid;
    }

    public LocalDateTime getDatePaid() {
        return datePaid;
    }

    public void setDatePaid(LocalDateTime datePaid) {
        this.datePaid = datePaid;
    }

    public LocalDateTime getDateDue() {
        return dateDue;
    }

    public void setDateDue(LocalDateTime dateDue) {
        this.dateDue = dateDue;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public CreditCard getCreditCard() {
        return creditCard;
    }

    public void setCreditCard(CreditCard creditCard) {
        this.creditCard = creditCard;
    }
}
