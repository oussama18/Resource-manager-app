package com.example.recourcesmanager.controllers;

import com.example.recourcesmanager.DTO.ViewPanne;
import com.example.recourcesmanager.DTO.ViewRessource;
import com.example.recourcesmanager.models.AbstractRessource;
import com.example.recourcesmanager.models.Panne;
import com.example.recourcesmanager.services.BreakDownService.PanneService;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1")
public class PanneController {
    private PanneService panneService;

    @JsonView({ViewPanne.PanneResponse.class})
    @GetMapping("/pannes")
    public ResponseEntity<List<Panne>> getPannes() {
        return  ResponseEntity.ok().body(this.panneService.getPannes());
    }

    @JsonView({ViewPanne.PanneResponse.class})
    @PostMapping("/panne")
    public ResponseEntity<Panne> savePanne(@RequestBody Panne panne) {
        Panne panneAfterSaving = this.panneService.save(panne);

        System.out.println(panneAfterSaving.toString());

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/panne").toUriString());

        return ResponseEntity.created(uri).body(panneAfterSaving);
    }
    @JsonView({ViewPanne.PanneResponse.class})
    @GetMapping("/pannes/user/{username}")
    public ResponseEntity<List<Panne>> getPannesByUser(@RequestBody String username) {
        return  ResponseEntity.ok().body(this.panneService.getPannesByUser(username));
    }
}
