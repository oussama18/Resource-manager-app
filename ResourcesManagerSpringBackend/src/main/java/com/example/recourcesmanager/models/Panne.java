package com.example.recourcesmanager.models;

import com.example.recourcesmanager.DTO.ViewAffectation;
import com.example.recourcesmanager.DTO.ViewPanne;
import com.example.recourcesmanager.DTO.ViewPersonne;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@Document(collection = "panne")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Panne {
    @Id
    @JsonView(ViewPanne.PanneResponse.class)
    private String id;


    @JsonView(ViewPanne.PanneResponse.class)
    private AbstractRessource ressource;


    @JsonView(ViewPanne.PanneResponse.class)
    private Personne person;

    @JsonView(ViewPanne.PanneResponse.class)
    private Date date_Apparition ;


    @JsonView(ViewPanne.PanneResponse.class)
    private String explication;


    @JsonView(ViewPanne.PanneResponse.class)
    private Frequence frequence;


    @JsonView(ViewPanne.PanneResponse.class)
    private OrderPanne orderPanne;


    //this parametre is added to avoid listing panne which already traited
    //traited means that a constat is added by a technicien


    @JsonView(ViewPanne.PanneResponse.class)
    private Boolean isTraited = false;



}
