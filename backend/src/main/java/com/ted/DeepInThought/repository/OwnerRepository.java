package com.ted.DeepInThought.repository;

import com.ted.DeepInThought.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, String> {

    @Query(value = "ALTER SESSION SET JDBC_QUERY_RESULT_FORMAT='JSON'", nativeQuery = true)
    void setJSON();
}
