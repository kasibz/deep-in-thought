package com.ted.DeepInThought.dto;

import lombok.Data;

@Data
public class TenantRequest extends UserRequest {
    private String propertyId;
    private String contractId;

    public String getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(String propertyId) {
        this.propertyId = propertyId;
    }

    public String getContractId() {
        return contractId;
    }

    public void setContractId(String contractId) {
        this.contractId = contractId;
    }
}
