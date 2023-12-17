package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.dto.PropertyRequest;
import com.ted.DeepInThought.model.Property;
import com.ted.DeepInThought.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/property")
public class PropertyController extends BaseController<Property, String>{

    @Autowired
    private PropertyService propertyService;

    @Autowired
    public PropertyController(PropertyService propertyService) {
        super(propertyService);
    }

    @GetMapping("/owner/{id}")
    public ResponseEntity<List<Property>> getAllByOwnerId(@PathVariable String id) {
        try {
            List<Property> propertyList = propertyService.getAllbyOwnerId(id);
            return new ResponseEntity<>(propertyList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Property> create(@RequestBody PropertyRequest propertyRequest) {
        try {
           Property newProperty = propertyService.saveFromPropertyDTO(propertyRequest);
           return new ResponseEntity<>(newProperty, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
