package com.ted.DeepInThought.controller;

import com.ted.DeepInThought.service.BaseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Don't quite see how to abstract the PUT method. Write it custom for all entities.
// Same with entities that have a foreign key as a property. Custom write the POST.
// Also, the BaseController is constructed with my BaseService
public abstract class BaseController<T, ID> {

    private final BaseService<T, ID> service;

    protected BaseController(BaseService<T, ID> service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<T>> getAll() {
        try {
            List<T> entityList = service.getAll();
            if (entityList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(entityList, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> getById(@PathVariable ID id) {
        Optional<T> entityData = service.getById(id);

        if (entityData.isPresent()) {
            return new ResponseEntity<>(entityData.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<T> create(@RequestBody T entity) {
        try {
            T savedEntity = service.save(entity);
            return new ResponseEntity<>(savedEntity, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable ID id) {
        try {
            service.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
