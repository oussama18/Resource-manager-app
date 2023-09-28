package com.example.recourcesmanager.services.BreakDownService;

import com.example.recourcesmanager.models.AbstractRessource;
import com.example.recourcesmanager.models.Affectation;
import com.example.recourcesmanager.models.Constat;
import com.example.recourcesmanager.models.Panne;
import com.example.recourcesmanager.repositories.AffectationRepository;
import com.example.recourcesmanager.repositories.ConstatRepository;
import com.example.recourcesmanager.repositories.PanneRepository;
import com.example.recourcesmanager.services.ResourceManageService.AffectationService;
import com.example.recourcesmanager.services.ResourceManageService.RessourceService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
public class ConstatServiceImp implements  ConstatService {
    private ConstatRepository constatRepository;
    private PanneRepository panneRepository;
    private AffectationRepository affectationRepository;
    private RessourceService ressourceService;


    @Override
    public Constat save(Constat constat) {
        return constatRepository.save(constat);
    }

    @Override
    public Constat update(Constat constat) {
        return constatRepository.save(constat);
    }

    @Override
    public List<Constat> getConstat() {
        return constatRepository.findConstatsByHidded(false);
    }

    @Override
    public boolean ReparerRessource(Constat constat) {
       try{
        constat.setHidded(true);
        return true;
       }catch(Exception e){
           System.out.println(e.getMessage());
           return false;
       }
    }

    @Override
    public boolean changerRessource(Constat constat) {
        try {
            AbstractRessource Ressource = constat.getPanne().getRessource();
            Affectation affectation = affectationRepository.findAffectationsByRessource(Ressource);
            affectationRepository.delete(affectation);
            ressourceService.delete(Ressource.getId());
            return true;

        } catch (Exception e) {
            return false;
        }
    }
}
