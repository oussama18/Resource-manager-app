package com.example.recourcesmanager.repositories;

import com.example.recourcesmanager.models.Fournisseur;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FournisseurRepository extends MongoRepository<Fournisseur, String> {
}
