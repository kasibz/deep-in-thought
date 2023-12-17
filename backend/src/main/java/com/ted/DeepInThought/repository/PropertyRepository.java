package com.ted.DeepInThought.repository;

import com.ted.DeepInThought.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, String> {

    List<Property> findByOwnerId(String ownerId);
}
