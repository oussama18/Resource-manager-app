package com.example.recourcesmanager.services.AccountManager;

import com.example.recourcesmanager.models.Personne;
import com.example.recourcesmanager.repositories.PersonRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PersonneServiceImpl implements PersonneService{
    private PersonRepository personRepository;

    @Override
    public List<Personne> getPersonnes() {
        return personRepository.findAll();
    }

    @Override
    public Personne getPersonne(String id) {
        return personRepository.findById(id).get();
    }

    @Override
    public Personne savePersonne(Personne personne) {
        return personRepository.save(personne);
    }

    @Override
    public Personne updatePersonne(Personne personne) {
        return personRepository.save(personne);
    }

    @Override
    public boolean deletePersonne(String id) {
         personRepository.deleteById(id);
         return true;
    }
}
