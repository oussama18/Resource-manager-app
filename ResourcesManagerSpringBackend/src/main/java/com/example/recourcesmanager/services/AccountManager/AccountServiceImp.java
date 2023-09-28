package com.example.recourcesmanager.services.AccountManager;

import com.example.recourcesmanager.models.AbstractCompte;
import com.example.recourcesmanager.models.CompteRole;
import com.example.recourcesmanager.models.FaculteCompte;
import com.example.recourcesmanager.models.Roles;
import com.example.recourcesmanager.repositories.CompteRepository;
import com.example.recourcesmanager.repositories.RoleRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service

@Transactional
@Slf4j
@AllArgsConstructor
public class AccountServiceImp implements AccountService, UserDetailsService {
    private  CompteRepository compteRepository;
    private  RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public AbstractCompte saveCompte(AbstractCompte abs) {

      ((FaculteCompte) abs).setPassword(passwordEncoder.encode(((FaculteCompte)abs).getPassword()));
        return this.compteRepository.save((FaculteCompte) abs);
    }

    @Override
    public AbstractCompte updateCompte(AbstractCompte compte) {
        ((FaculteCompte) compte).setPassword(passwordEncoder.encode(((FaculteCompte)compte).getPassword()));

        return compteRepository.save((FaculteCompte) compte);
    }

    @Override
    public boolean deleteCompte(String username) {
        compteRepository.deleteByUserName(username);
        return true;
    }

    @Override
    public Roles saveRole(Roles role) {

        return this.roleRepository.save(role);
    }

    @Override
    public boolean addRoletoAccount(String username, CompteRole roleName) {
        try {
            FaculteCompte faculteCompte = this.compteRepository.findByUserName(username);

            faculteCompte.getRoles().add(roleName);
            this.compteRepository.save(faculteCompte);
            return true;
        }catch(Exception e ){
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public AbstractCompte getAccount(String username) {
        return this.compteRepository.findByUserName(username);
    }

    @Override
    public List<? extends AbstractCompte> getAccounts() {
        return this.compteRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    FaculteCompte account = this.compteRepository.findByUserName(username);
    if(account == null){
        log.error("user not found");
        throw new UsernameNotFoundException("user not found");

    }
        Collection<SimpleGrantedAuthority> authorities=new ArrayList<>();
        account.getRoles().forEach(role->{
            authorities.add(new SimpleGrantedAuthority(role.toString()));
        });

    return new User(account.getUserName(),account.getPassword(),authorities);
    }
}
