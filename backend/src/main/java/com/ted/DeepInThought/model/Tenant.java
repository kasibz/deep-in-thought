package com.ted.DeepInThought.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "TENANT")
public class Tenant extends User{
    @ManyToOne
    @JoinColumn(name = "propertyId", nullable = false)
    @JsonBackReference(value = "tenant-property")
    private Property property;

    @ManyToOne
    @JoinColumn(name = "contractId", nullable = false)
    @JsonBackReference
    private Contract contract;

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }
}
