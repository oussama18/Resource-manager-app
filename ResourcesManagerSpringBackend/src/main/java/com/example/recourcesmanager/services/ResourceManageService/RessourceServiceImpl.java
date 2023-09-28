package com.example.recourcesmanager.services.ResourceManageService;

import com.example.recourcesmanager.models.AbstractRessource;
import com.example.recourcesmanager.models.FaculteCompte;
import com.example.recourcesmanager.repositories.CompteRepository;
import com.example.recourcesmanager.repositories.RessourceRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class RessourceServiceImpl implements RessourceService {

    @Autowired
    private RessourceRepository ressourceRepository;
    private CompteRepository compteRepository;


    @Override
    public List<AbstractRessource> getRessources() {
        return ressourceRepository.findAll();
    }

    @Override
    public AbstractRessource getRessource(String id) {
        Optional<AbstractRessource> ressource = ressourceRepository.findById(id);
        if (ressource.isPresent()){
            return ressource.get();
        }
        return null;
    }

    public AbstractRessource save(AbstractRessource ressource) {
        return ressourceRepository.save(ressource);
    }

    @Override
    public AbstractRessource update(AbstractRessource ressource) {
        return ressourceRepository.save(ressource);
    }

    @Override
    public boolean delete(String id) {
        ressourceRepository.deleteById(id);
        return true;
    }

}
