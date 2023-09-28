package com.example.recourcesmanager.services.AccountManager;

import com.example.recourcesmanager.models.Departement;

import java.util.List;

public interface DepartementService {
    List<? extends Departement> getDepartements();

    Departement getDepartementById(String id);

    Departement save(Departement departement);

    Departement update(Departement departement);

    boolean delete(String id);
}
