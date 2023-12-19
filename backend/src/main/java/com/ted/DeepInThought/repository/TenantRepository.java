package com.ted.DeepInThought.repository;

import com.ted.DeepInThought.model.Contract;
import com.ted.DeepInThought.model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.xml.namespace.QName;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, String>{

    public interface TenantWithContract {
        String getTenant_id();
        String getFirst_name();
        String getLast_name();
        String getEmail();
        Long getPhone_number();
        String getContract_id();
        Long getLength();
        LocalDate getStart_date();
        LocalDate getStop_date();
        Long getRent();
    }

    @Query(value ="SELECT TENANT.ID AS TENANT_ID, TENANT.FIRST_NAME, TENANT.LAST_NAME, TENANT.EMAIL, TENANT.PHONE_NUMBER, CONTRACT.ID AS CONTRACT_ID, CONTRACT.LENGTH, CONTRACT.START_DATE, CONTRACT.STOP_DATE, CONTRACT.RENT FROM TENANT JOIN CONTRACT ON TENANT.CONTRACT_ID = CONTRACT.ID WHERE TENANT.ID = :tenantId", nativeQuery = true)
    TenantWithContract findContractByTenantId(@Param("tenantId") String id);

    // I need to make the signature return an optional if I want to handle errors better
    // for my custom queries
    Optional<Tenant> findByEmail(String email);

    List<Tenant> findByPropertyId(String id);

    // most tenants will only have one contract so the list serves as looking at past contracts. I should have a way to restrict contract
    // A way to restrict would be to use that isPaid boolean to say that the rent is completely paid for the entire length of contract
}
