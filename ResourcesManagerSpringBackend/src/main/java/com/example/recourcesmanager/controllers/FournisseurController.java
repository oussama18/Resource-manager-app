package com.example.recourcesmanager.controllers;

import com.example.recourcesmanager.DTO.ViewFournisseur;
import com.example.recourcesmanager.DTO.ViewRessource;
import com.example.recourcesmanager.models.AbstractRessource;
import com.example.recourcesmanager.models.Fournisseur;
import com.example.recourcesmanager.services.ResourceManageService.FournisseurService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.websocket.server.PathParam;
import java.net.URI;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1")
public class FournisseurController {

    private FournisseurService fournisseurService;

    @JsonView(ViewFournisseur.FournisseurResponse.class)
    @GetMapping("/fournisseurs")
    public ResponseEntity<List<Fournisseur>> getFournisseurs() {
        return  ResponseEntity.ok().body(this.fournisseurService.getFournisseurs());
    }

    @JsonView(ViewFournisseur.FournisseurResponse.class)
    @GetMapping("/fournisseur/{id}")
    public ResponseEntity<Fournisseur> getFournisseur(@PathVariable String id){
        return ResponseEntity.ok().body(this.fournisseurService.getFournisseurById(id));
    }

    @JsonView(ViewFournisseur.FournisseurResponse.class)
    @PostMapping("/fournisseur")
    public ResponseEntity<Fournisseur> saveFournisseur(@RequestBody Fournisseur fournisseur) {
        Fournisseur fournisseurAfterSaving = this.fournisseurService.save(fournisseur);

        System.out.println(fournisseurAfterSaving.toString());

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/fournisseur").toUriString());

        return ResponseEntity.created(uri).body(fournisseurAfterSaving);
    }


    @JsonView(ViewFournisseur.FournisseurResponse.class)
    @PutMapping("/fournisseur")
    public ResponseEntity<?> updateRessource(@RequestBody Fournisseur fournisseur) {
        Fournisseur fournisseurAfterSaving = this.fournisseurService.update(fournisseur);

        return ResponseEntity.accepted().body(fournisseurAfterSaving);
    }

    @DeleteMapping("/fournisseur/{id}")
    public ResponseEntity<?> deleteRessource(@PathVariable String id) {
        boolean stat = this.fournisseurService.delete(id);

        if (!stat) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.ok().build();
    }
}
