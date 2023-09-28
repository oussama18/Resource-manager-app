package com.example.recourcesmanager.services.BreakDownService;

import com.example.recourcesmanager.models.AbstractRessource;
import com.example.recourcesmanager.models.Panne;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PanneService {

    List<Panne> getPannes() ;

    Panne getPanneById(String id);

    Panne save(Panne panne);

    List<Panne> getPannesByUser(String username);







}
