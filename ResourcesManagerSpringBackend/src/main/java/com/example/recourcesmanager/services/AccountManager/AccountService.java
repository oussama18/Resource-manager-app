package com.example.recourcesmanager.services.AccountManager;

import com.example.recourcesmanager.models.AbstractCompte;
import com.example.recourcesmanager.models.CompteRole;
import com.example.recourcesmanager.models.Roles;

import java.util.List;

public interface AccountService {

    AbstractCompte saveCompte(AbstractCompte abs);
    AbstractCompte updateCompte(AbstractCompte compte);
    boolean deleteCompte(String username);
    Roles saveRole(Roles role);
    boolean addRoletoAccount(String username, CompteRole RoleName);
    AbstractCompte getAccount(String username);
    List<? extends AbstractCompte> getAccounts();



}
