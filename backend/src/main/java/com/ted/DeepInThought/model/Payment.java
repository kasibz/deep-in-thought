package com.ted.DeepInThought.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "PAYMENT")
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    private String id;
    private boolean isPaid;
    private LocalDateTime datePaid;
    private LocalDateTime dateDue;
    private Long amount;

    @ManyToOne
    @JoinColumn(name = "creditCreditId", nullable = false)
    @JsonBackReference(value = "payment-creditCard")
    private CreditCard creditCard;

    @ManyToOne
    @JoinColumn(name = "tenantId", nullable = false)
    @JsonBackReference
    private Tenant tenant;
}
