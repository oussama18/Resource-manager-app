package com.example.recourcesmanager.controllers;

import com.example.recourcesmanager.DTO.ViewPersonne;
import com.example.recourcesmanager.models.Personne;
import com.example.recourcesmanager.services.AccountManager.PersonneService;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;


@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1")
public class PersonneController {
    private PersonneService personneService;

    @JsonView({ViewPersonne.PersonneResponse.class})
    @GetMapping("/personnes")
    public ResponseEntity<List<Personne>> getPersonnes() {
        return  ResponseEntity.ok().body(this.personneService.getPersonnes());
    }

    @JsonView({ViewPersonne.PersonneResponse.class})
    @GetMapping("/personne/{id}")
    public ResponseEntity<Personne> getPersonne(@PathVariable String id){
        return ResponseEntity.ok().body(this.personneService.getPersonne(id));
    }

    @JsonView({ViewPersonne.PersonneResponse.class})
    @PostMapping("/personne")
    public ResponseEntity<Personne> savePersonne(@RequestBody Personne personne) {
        Personne personneAfterSaving = this.personneService.savePersonne(personne);

        System.out.println(personne.toString());

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/personne").toUriString());

        return ResponseEntity.created(uri).body(personneAfterSaving);
    }


    @JsonView({ViewPersonne.PersonneResponse.class})
    @PutMapping("/personne")
    public ResponseEntity<?> updatePersonne(@RequestBody Personne personne) {
        Personne personneAfterSaving = this.personneService.updatePersonne(personne);


        return ResponseEntity.accepted().body(personneAfterSaving);
    }

    @DeleteMapping("/personne/{id}")
    public ResponseEntity<?> deletePersonne(@PathVariable String id) {
        boolean stat = this.personneService.deletePersonne(id);

        if (!stat) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.ok().build();
    }
}
