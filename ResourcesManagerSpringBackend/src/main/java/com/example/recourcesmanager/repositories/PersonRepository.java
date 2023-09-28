package com.example.recourcesmanager.repositories;

import com.example.recourcesmanager.models.Personne;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends MongoRepository<Personne, String> {
}
