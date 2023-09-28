package com.example.recourcesmanager;

import com.example.recourcesmanager.models.*;
import com.example.recourcesmanager.repositories.PersonRepository;
import com.example.recourcesmanager.repositories.RoleRepository;
import com.example.recourcesmanager.services.AccountManager.AccountService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
import java.util.HashSet;

@SpringBootApplication
public class RecourcesManagerApplication {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static void main(String[] args) {
        SpringApplication.run(RecourcesManagerApplication.class, args);
    }

    @Bean
    public CommandLineRunner runas(AccountService accountService, PersonRepository personRepository,
                                   RoleRepository roleRepository) {
        return args -> {

//            Personne enseigant = new Enseignant("lamyae@gmaill.com", "lamyae2", "achaouch", new Date(), "informatique");
//            personRepository.save(enseigant);
//            Roles role = new Roles();
//            role.setName(CompteRole.responsableRessources);
//            roleRepository.save(role);
//
                /*FaculteCompte compte = (FaculteCompte) accountService.getAccount("lamyae01");
                compte.setRoles(null);*/

              //accountService.addRoletoAccount("lamyae01", CompteRole.responsableRessources);

        };
    }

}
