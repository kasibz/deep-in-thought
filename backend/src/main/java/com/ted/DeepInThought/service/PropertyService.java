package com.ted.DeepInThought.service;

import com.ted.DeepInThought.model.Property;
import com.ted.DeepInThought.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PropertyService extends BaseService<Property, String>{

    @Autowired
    private PropertyRepository propertyRepo;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository) {
        super(propertyRepository);
    }
}
