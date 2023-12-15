package com.ted.DeepInThought.repository;

import com.ted.DeepInThought.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, String> {
    // ex: I need to get all properties for an Owner. Write the function here
}
