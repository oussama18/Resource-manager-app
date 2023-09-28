package com.example.recourcesmanager.controllers;


import com.example.recourcesmanager.DTO.ViewDepartement;
import com.example.recourcesmanager.models.*;
import com.example.recourcesmanager.services.ResourceManageService.AffectationService;
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
public class AffectationController {
    private AffectationService affectationService;

    @GetMapping("/affectations")
    public ResponseEntity<List<Affectation>> getAffectations() {
        return  ResponseEntity.ok().body(this.affectationService.getAffectations());
    }


    @GetMapping("/affectation/{id}")
    public ResponseEntity<Affectation> getAffectation(@PathVariable String id){
        return ResponseEntity.ok().body(this.affectationService.getAffectationById(id));
    }

    @GetMapping("/affectation/user/{username}")
    public ResponseEntity<List<Affectation>> getAffectationsByuser(@PathVariable String username) {
        return  ResponseEntity.ok().body(this.affectationService.getAffectationByUser(username));
    }


    @PostMapping("/affectationPers")
    public ResponseEntity<Affectation<FacultePerson>> saveAffectationPers(@RequestBody Affectation<FacultePerson> affectation) {
        Affectation affectationAfterSaving = this.affectationService.save(affectation);

        System.out.println(affectationAfterSaving.toString());

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/affectationPers").toUriString());

        return ResponseEntity.created(uri).body(affectationAfterSaving);
    }

    @PostMapping("/affectationDepar")
    public ResponseEntity<Affectation<FaculteDepartement>> saveAffectationDepar(@RequestBody Affectation<FaculteDepartement> affectation) {
        Affectation affectationAfterSaving = this.affectationService.save(affectation);

        System.out.println(affectationAfterSaving.toString());

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/affectationDepar").toUriString());

        return ResponseEntity.created(uri).body(affectationAfterSaving);
    }



    @DeleteMapping("/affectation/{id}")
    public ResponseEntity<?> deleteAffectation(@PathVariable String id) {
        boolean stat = this.affectationService.delete(id);

        if (!stat) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.ok().build();
    }
}
