package com.example.recourcesmanager.services.ResourceManageService;

import com.example.recourcesmanager.models.Fournisseur;
import com.example.recourcesmanager.repositories.FournisseurRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FournisseurServiceImpl implements FournisseurService {

    private FournisseurRepository fournisseurRepository;

    @Override
    public List<Fournisseur> getFournisseurs() {
        return fournisseurRepository.findAll();
    }

    @Override
    public Fournisseur getFournisseurById(String id) {
        return fournisseurRepository.findById(id).get();
    }

    @Override
    public Fournisseur save(Fournisseur fournisseur) {
        return fournisseurRepository.save(fournisseur);
    }

    @Override
    public Fournisseur update(Fournisseur fournisseur) {
        return fournisseurRepository.save(fournisseur);
    }

    @Override
    public boolean delete(String id) {
        fournisseurRepository.deleteById(id);
        return true;
    }
}
