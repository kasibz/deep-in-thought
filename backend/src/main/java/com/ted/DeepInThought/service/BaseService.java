package com.ted.DeepInThought.service;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public abstract class BaseService<T, ID> {

    private final JpaRepository<T, ID> repository;

    // constructor for this base Service
    protected BaseService(JpaRepository<T, ID> repository) {
        this.repository = repository;
    }

    public List<T> getAll() {
        return repository.findAll();
    }

    public Optional<T> getById(ID id) {
        return repository.findById(id);
    }

    public T save(T entity) {
        return repository.save(entity);
    }



    public void deleteById(ID id) {
        repository.deleteById(id);
    }

}
