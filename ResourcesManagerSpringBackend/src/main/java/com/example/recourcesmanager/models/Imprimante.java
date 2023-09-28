package com.example.recourcesmanager.models;


import com.example.recourcesmanager.DTO.ViewRessource;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "ressource")
@Data
public class Imprimante extends AbstractRessource {

	@JsonView(ViewRessource.RessourceResponse.class)
	private int resolution;
	@JsonView(ViewRessource.RessourceResponse.class)
	private int vitesse_imprission;

	public Imprimante(){

	}

	public Imprimante(Date date_livraison, long garantie, String marque, int resolution, int vitesse_imprission) {
		super(date_livraison, garantie, marque);
		this.resolution = resolution;
		this.vitesse_imprission = vitesse_imprission;
	}

	public Imprimante(int resolution, int vitesse_imprission) {
		this.resolution = resolution;
		this.vitesse_imprission = vitesse_imprission;
	}

	public void setResolution(int resolution) {
		this.resolution = resolution;
	}

	public void setVitesse_imprission(int vitesse_imprission) {
		this.vitesse_imprission = vitesse_imprission;
	}

	public int getResolution() {
		return resolution;
	}

	public int getVitesse_imprission() {
		return vitesse_imprission;
	}
}