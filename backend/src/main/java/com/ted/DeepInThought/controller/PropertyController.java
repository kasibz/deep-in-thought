package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.model.Property;
import com.ted.DeepInThought.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/property")
public class PropertyController extends BaseController<Property, String>{

    @Autowired
    private PropertyService propertyService;

    @Autowired
    public PropertyController(PropertyService propertyService) {
        super(propertyService);
    }

}
