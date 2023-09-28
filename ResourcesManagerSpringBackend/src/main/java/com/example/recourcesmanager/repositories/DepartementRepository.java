package com.example.recourcesmanager.repositories;

import com.example.recourcesmanager.models.FaculteDepartement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartementRepository extends MongoRepository<FaculteDepartement,String> {
}
