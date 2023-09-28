package com.example.recourcesmanager.services.ResourceManageService;

import com.example.recourcesmanager.models.Fournisseur;

import java.util.List;

public interface FournisseurService {

    List<Fournisseur> getFournisseurs();

    Fournisseur getFournisseurById(String id);

    Fournisseur save(Fournisseur fournisseur);

    Fournisseur update(Fournisseur fournisseur);

    boolean delete(String id);


}
