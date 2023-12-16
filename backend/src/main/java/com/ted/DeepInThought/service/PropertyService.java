package com.ted.DeepInThought.service;

import com.ted.DeepInThought.dto.PropertyRequest;
import com.ted.DeepInThought.model.Owner;
import com.ted.DeepInThought.model.Property;
import com.ted.DeepInThought.repository.OwnerRepository;
import com.ted.DeepInThought.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            newProperty.setOwner(existingOwner);

            return propertyRepo.save(newProperty);
        }
        throw new Error("Owner not found with id: " + propertyRequest.getOwnerId());
    }
}
