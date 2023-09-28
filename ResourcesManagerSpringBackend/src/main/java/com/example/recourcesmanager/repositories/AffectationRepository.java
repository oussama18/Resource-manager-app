package com.example.recourcesmanager.repositories;

import com.example.recourcesmanager.models.AbstractRessource;
import com.example.recourcesmanager.models.Affectation;
import com.example.recourcesmanager.models.FaculteCompte;
import com.example.recourcesmanager.models.Personne;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AffectationRepository extends MongoRepository<Affectation,String> {
    Affectation findAffectationsByRessource(AbstractRessource ressource);

    List<Affectation> findAffectationByPersonelAffect(Personne personne);
}
