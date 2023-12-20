package com.ted.DeepInThought.service;

import com.ted.DeepInThought.dto.OwnerRequest;
import com.ted.DeepInThought.dto.PropertyRequest;
import com.ted.DeepInThought.model.Owner;
import com.ted.DeepInThought.model.Property;
import com.ted.DeepInThought.repository.OwnerRepository;
import com.ted.DeepInThought.repository.PropertyRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PropertyService extends BaseService<Property, String>{

    @Autowired
    private PropertyRepository propertyRepo;

    @Autowired
    private OwnerRepository ownerRepo;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository) {
        super(propertyRepository);
    }

    public Property saveFromPropertyDTO(PropertyRequest propertyRequest) {
        Optional<Owner> ownerData = ownerRepo.findById(propertyRequest.getOwnerId());

        if (ownerData.isPresent()) {
            Owner existingOwner = ownerData.get();

            Property newProperty = new Property();
            String uuid = UUID.randomUUID().toString();
            newProperty.setId(uuid);
            newProperty.setName(propertyRequest.getName());
            newProperty.setType(propertyRequest.getType());
            newProperty.setStreetAddress(propertyRequest.getStreetAddress());
            newProperty.setCity(propertyRequest.getCity());
            newProperty.setState(propertyRequest.getState());
            newProperty.setZipcode(propertyRequest.getZipcode());
            newProperty.setOwner(existingOwner);

            return propertyRepo.save(newProperty);
        }
        throw new Error("Owner not found with id: " + propertyRequest.getOwnerId());
    }

    public Property editProperty(String id, PropertyRequest propertyRequest) {
        Optional<Property> propertyData = propertyRepo.findById(id);

        if (propertyData.isPresent()) {
            Property existingProperty = propertyData.get();

            if (propertyRequest.getName() != null) {
                existingProperty.setName(propertyRequest.getName());
            }
            if (propertyRequest.getType() != null) {
                existingProperty.setType(propertyRequest.getType());
            }
            if (propertyRequest.getStreetAddress() != null) {
                existingProperty.setStreetAddress(propertyRequest.getStreetAddress());
            }
            if (propertyRequest.getCity() != null) {
                existingProperty.setCity(propertyRequest.getCity());
            }
            if (propertyRequest.getZipcode() != null) {
                existingProperty.setZipcode(propertyRequest.getZipcode());
            }
            if (propertyRequest.getState() != null) {
                existingProperty.setState(propertyRequest.getState());
            }

            return propertyRepo.save(existingProperty); // Save the updated property and return it
        } else {
            throw new Error("Property not found with id: " + id);
        }
    }

    public List<Property> getAllbyOwnerId(String ownerId) {
        List<Property> propertyList = new ArrayList<>();
        propertyRepo.findByOwnerId(ownerId).forEach(propertyList::add);
        return propertyList;
    }
}
