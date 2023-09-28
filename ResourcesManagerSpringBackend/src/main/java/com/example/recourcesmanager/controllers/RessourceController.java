package com.example.recourcesmanager.controllers;

import com.example.recourcesmanager.DTO.ViewFournisseur;
import com.example.recourcesmanager.DTO.ViewRessource;
import com.example.recourcesmanager.models.AbstractRessource;
import com.example.recourcesmanager.services.ResourceManageService.RessourceService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.boot.json.JacksonJsonParser;
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
public class RessourceController {
    private RessourceService ressourceService;

    @JsonView({ViewRessource.RessourceResponse.class})
    @GetMapping("/ressources")
    public ResponseEntity<List<AbstractRessource>> getRessources() {
        return  ResponseEntity.ok().body(this.ressourceService.getRessources());
    }

    @JsonView({ViewRessource.RessourceResponse.class})
    @GetMapping("/ressource/{id}")
    public ResponseEntity<AbstractRessource> getRessource(@PathVariable String id){
        return ResponseEntity.ok().body(this.ressourceService.getRessource(id));
    }

    @JsonView({ViewRessource.RessourceResponse.class})
    @PostMapping("/ressource")
    public ResponseEntity<AbstractRessource> saveRessource(@RequestBody AbstractRessource abstractRessource) {
        AbstractRessource ressourceAfterSaving = this.ressourceService.save(abstractRessource);

        System.out.println(abstractRessource.toString());

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/ressource").toUriString());

        return ResponseEntity.created(uri).body(ressourceAfterSaving);
    }


    @JsonView({ViewRessource.RessourceResponse.class})
    @PutMapping("/ressource")
    public ResponseEntity<?> updateRessource(@RequestBody AbstractRessource abstractRessource) {
        AbstractRessource ressourceAfterSaving = this.ressourceService.update(abstractRessource);

        System.out.println(abstractRessource.getDate_livraison().toString());


        return ResponseEntity.accepted().body(ressourceAfterSaving);
    }

    @DeleteMapping("/ressource/{id}")
    public ResponseEntity<?> deleteRessource(@PathVariable String id) {
        boolean stat = this.ressourceService.delete(id);

        if (!stat) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.ok().build();
    }

}
