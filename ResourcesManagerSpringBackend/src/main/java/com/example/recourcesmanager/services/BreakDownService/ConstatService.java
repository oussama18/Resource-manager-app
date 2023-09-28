package com.example.recourcesmanager.services.BreakDownService;

import com.example.recourcesmanager.models.Constat;
import com.example.recourcesmanager.models.Panne;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ConstatService {

    Constat save(Constat constat);

    Constat update(Constat  constat);

    List<Constat> getConstat();

    boolean ReparerRessource(Constat constat);

    boolean changerRessource(Constat constat);

}
