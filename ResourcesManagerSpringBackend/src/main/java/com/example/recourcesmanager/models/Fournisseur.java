package com.example.recourcesmanager.models;


import com.example.recourcesmanager.DTO.ViewFournisseur;
import com.example.recourcesmanager.DTO.ViewRessource;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author PC
 * @version 1.0
 * @created 23-mars-2022 22:06:44
 */

@Document(collection = "fournisseur")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Fournisseur {

    @Id
    @JsonView({ViewFournisseur.FournisseurResponse.class,ViewRessource.RessourceResponse.class})
    private String id;

    @JsonView(ViewFournisseur.FournisseurResponse.class)
    private String adresse;
    @JsonView(ViewFournisseur.FournisseurResponse.class)
    private String email;
    @JsonView(ViewFournisseur.FournisseurResponse.class)
    private String gerant;
    @JsonView(ViewFournisseur.FournisseurResponse.class)
    private String nom_societe;


}