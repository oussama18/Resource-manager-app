package com.example.recourcesmanager.services.AccountManager;

import com.example.recourcesmanager.models.Departement;
import com.example.recourcesmanager.models.FaculteDepartement;
import com.example.recourcesmanager.repositories.DepartementRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DepartementServiceImpl implements DepartementService{

    private DepartementRepository departementRepository;

    @Override
    public List<? extends Departement> getDepartements() {
        return departementRepository.findAll();
    }

    @Override
    public Departement getDepartementById(String id) {
        return departementRepository.findById(id).get();
    }

    @Override
    public Departement save(Departement departement) {
        return departementRepository.save((FaculteDepartement) departement);
    }

    @Override
    public Departement update(Departement departement) {
        return departementRepository.save((FaculteDepartement) departement);
    }

    @Override
    public boolean delete(String id) {
        departementRepository.deleteById(id);
        return true;
    }
}
