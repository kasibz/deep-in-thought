package com.ted.DeepInThought.repository;

import com.ted.DeepInThought.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContractRepository extends JpaRepository<Contract, String> {
}
