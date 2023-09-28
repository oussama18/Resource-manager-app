package com.example.recourcesmanager.controllers;


import com.example.recourcesmanager.DTO.ViewConstat;
import com.example.recourcesmanager.DTO.ViewPanne;
import com.example.recourcesmanager.models.Constat;
import com.example.recourcesmanager.models.Panne;
import com.example.recourcesmanager.services.BreakDownService.ConstatService;
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
public class ConstatController {
    private ConstatService constatService;

    // pour Ressource Manager
    @JsonView({ViewConstat.ConstatResponse.class})
    @GetMapping("/constats")
    public ResponseEntity<List<Constat>> getConstats() {
        return  ResponseEntity.ok().body(this.constatService.getConstat());
    }


    // technicien
    @JsonView({ViewConstat.ConstatResponse.class})
    @PostMapping("/Constat")
    public ResponseEntity<Constat> savePanne(@RequestBody Constat constat) {
        Constat constatAfterSaving = this.constatService.save(constat);

        System.out.println(constatAfterSaving.toString());

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/constat").toUriString());

        return ResponseEntity.created(uri).body(constatAfterSaving);
    }





}
