package com.example.recourcesmanager.controllers;

import com.example.recourcesmanager.DTO.ViewDepartement;
import com.example.recourcesmanager.models.Departement;

import com.example.recourcesmanager.models.FaculteDepartement;
import com.example.recourcesmanager.services.AccountManager.DepartementService;
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
public class DepartementController {
    private DepartementService departementService;

    @JsonView(ViewDepartement.DepartementResponse.class)
    @GetMapping("/departements")
    public ResponseEntity<List<? extends Departement>> getDepartements() {
        return  ResponseEntity.ok().body(this.departementService.getDepartements());
    }

    @JsonView(ViewDepartement.DepartementResponse.class)
    @GetMapping("/departement/{id}")
    public ResponseEntity<Departement> getDepartement(@PathVariable String id){
        return ResponseEntity.ok().body(this.departementService.getDepartementById(id));
    }

    @JsonView(ViewDepartement.DepartementResponse.class)
    @PostMapping("/departement")
    public ResponseEntity<Departement> saveDepartement(@RequestBody FaculteDepartement departement) {
        Departement departementAfterSaving = this.departementService.save(departement);

        System.out.println(departementAfterSaving.toString());

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/departement").toUriString());

        return ResponseEntity.created(uri).body(departementAfterSaving);
    }


    @JsonView(ViewDepartement.DepartementResponse.class)
    @PutMapping("/departement")
    public ResponseEntity<?> updateRessource(@RequestBody FaculteDepartement departement) {
        Departement departementAfterSaving = this.departementService.update(departement);

        return ResponseEntity.accepted().body(departementAfterSaving);
    }

    @DeleteMapping("/departement/{id}")
    public ResponseEntity<?> deleteRessource(@PathVariable String id) {
        boolean stat = this.departementService.delete(id);

        if (!stat) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.ok().build();
    }
}
