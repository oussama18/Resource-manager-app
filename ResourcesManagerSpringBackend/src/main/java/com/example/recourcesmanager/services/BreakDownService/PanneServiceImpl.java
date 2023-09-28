package com.example.recourcesmanager.services.BreakDownService;

import com.example.recourcesmanager.models.AbstractRessource;
import com.example.recourcesmanager.models.FacultePerson;
import com.example.recourcesmanager.models.Panne;
import com.example.recourcesmanager.models.Personne;
import com.example.recourcesmanager.repositories.CompteRepository;
import com.example.recourcesmanager.repositories.PanneRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
public class PanneServiceImpl implements PanneService{

    private PanneRepository panneRepository;
    private CompteRepository compteRepository;
    //pour le technicien
    @Override
    public List<Panne> getPannes() {
        return panneRepository.findPannesByIsTraited(false);

    }

    @Override
    public Panne getPanneById(String id) {

        return panneRepository.findById(id).get();
    }

    @Override
    public Panne save(Panne panne) {
        return panneRepository.save(panne);
    }


    //pour l'utilisateur
    @Override
    public List<Panne> getPannesByUser(String username) {
        Personne user = compteRepository.findByUserName(username).getM_Personne();
        List<Panne> pannes = panneRepository.findByPerson(username);
        return pannes;
    }


}
