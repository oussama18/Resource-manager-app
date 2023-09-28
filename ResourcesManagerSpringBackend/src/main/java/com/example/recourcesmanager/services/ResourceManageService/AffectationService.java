package com.example.recourcesmanager.services.ResourceManageService;

import com.example.recourcesmanager.models.Affectation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AffectationService {
    List<Affectation> getAffectations();

    Affectation getAffectationById(String id);

    Affectation save(Affectation affectation);

    Affectation update(Affectation affectation);

    List<Affectation> getAffectationByUser(String username);

    boolean delete(String id);
}
