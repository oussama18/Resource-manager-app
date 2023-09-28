package com.example.recourcesmanager.models;

import com.example.recourcesmanager.DTO.ViewConstat;
import com.example.recourcesmanager.DTO.ViewPanne;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

@Document(collection = "Constat")
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Constat {
    @Id
    @JsonView(ViewConstat.ConstatResponse.class)
    private String id;


    @JsonView(ViewConstat.ConstatResponse.class)
    private Technicien technicien;


    @JsonView(ViewConstat.ConstatResponse.class)
    private Panne panne;


    @NotNull
    @JsonView(ViewConstat.ConstatResponse.class)
    private String constat;



    //this boolean just to hide a constat from a ressource manager interface while choose a decision
    @JsonView(ViewConstat.ConstatResponse.class)
    private boolean isHidded = false;



}
