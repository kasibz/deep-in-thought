package com.ted.DeepInThought.service;

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

    public List<Property> getAllbyOwnerId(String ownerId) {
        List<Property> propertyList = new ArrayList<>();
        propertyRepo.findByOwnerId(ownerId).forEach(propertyList::add);

        if (!propertyList.isEmpty()) {
            return propertyList;
        }
        throw new EntityNotFoundException("No properties found with owner with id: " + ownerId);
    }
}
