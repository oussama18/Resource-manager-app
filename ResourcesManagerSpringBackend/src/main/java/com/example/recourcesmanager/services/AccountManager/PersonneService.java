package com.example.recourcesmanager.services.AccountManager;

import com.example.recourcesmanager.models.Personne;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PersonneService {
    List<Personne> getPersonnes();

    Personne getPersonne(String id);

    Personne savePersonne(Personne personne);

    Personne updatePersonne(Personne personne);

    boolean deletePersonne(String id);
}
