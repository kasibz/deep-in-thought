package com.ted.DeepInThought.repository;

import com.ted.DeepInThought.model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.xml.namespace.QName;
import java.util.List;
import java.util.Optional;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, String>{

    // I need to make the signature return an optional if I want to handle errors better
    // for my custom queries
    Optional<Tenant> findByEmail(String email);

    List<Tenant> findByPropertyId(String id);
}
