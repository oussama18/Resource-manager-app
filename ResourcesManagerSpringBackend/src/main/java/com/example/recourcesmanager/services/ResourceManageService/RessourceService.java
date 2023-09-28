package com.example.recourcesmanager.services.ResourceManageService;

import com.example.recourcesmanager.models.AbstractRessource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RessourceService {
    List<AbstractRessource> getRessources();
    AbstractRessource getRessource(String id);

    AbstractRessource save(AbstractRessource ressource);
    AbstractRessource update(AbstractRessource ressource);
    boolean delete(String id);
}
