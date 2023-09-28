package com.example.recourcesmanager.models;


import com.example.recourcesmanager.DTO.ViewRessource;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;


@Document(collection = "ressource")
@Data
public class Ordinateur extends AbstractRessource {

	@JsonView(ViewRessource.RessourceResponse.class)
	private String cpu;
	@JsonView(ViewRessource.RessourceResponse.class)
	private String disque_dur;
	@JsonView(ViewRessource.RessourceResponse.class)
	private String ecran;
	@JsonView(ViewRessource.RessourceResponse.class)
	private String ram;


	public String getCpu() {
		return cpu;
	}

	public String getDisque_dur() {
		return disque_dur;
	}

	public String getEcran() {
		return ecran;
	}

	public String getRam() {
		return ram;
	}

	public Ordinateur(Date date_livraison, long garantie, String marque, String cpu, String disque_dur, String ecran, String ram) {
		super(date_livraison, garantie, marque);
		this.cpu = cpu;
		this.disque_dur = disque_dur;
		this.ecran = ecran;
		this.ram = ram;
	}

	public Ordinateur(){

	}


}