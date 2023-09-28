package com.example.recourcesmanager.services.ResourceManageService;

import com.example.recourcesmanager.models.Affectation;
import com.example.recourcesmanager.models.FaculteCompte;
import com.example.recourcesmanager.models.Personne;
import com.example.recourcesmanager.repositories.AffectationRepository;
import com.example.recourcesmanager.repositories.CompteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class AffectationServiceImpl implements AffectationService {

    private AffectationRepository affectationRepository;
    private CompteRepository compteRepository;

    @Override
    public List<Affectation> getAffectations() {
        return affectationRepository.findAll();
    }

    @Override
    public Affectation getAffectationById(String id) {
        return affectationRepository.findById(id).get();
    }

    @Override
    public Affectation save(Affectation affectation) {
        affectation.getRessource().setReserve(true);
        affectation.setDate_affectation(new Date());
        return affectationRepository.save(affectation);
    }

    @Override
    public Affectation update(Affectation affectation) {
        return affectationRepository.save(affectation);
    }

    @Override
    public List<Affectation> getAffectationByUser(String username) {
        Personne user = compteRepository.findByUserName(username).getM_Personne();
        List<Affectation> affectations = affectationRepository.findAffectationByPersonelAffect(user);
        return affectations;
    }

    @Override
    public boolean delete(String id) {
         affectationRepository.deleteById(id);
         return true;
    }
}

