package com.example.recourcesmanager.models;
import com.example.recourcesmanager.DTO.ViewFournisseur;
import com.example.recourcesmanager.DTO.ViewRessource;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "ressource")
@Data

@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		property = "type")
@JsonSubTypes({
		@JsonSubTypes.Type(value = Ordinateur.class, name = "ordinateur"),
		@JsonSubTypes.Type(value = Imprimante.class, name = "imprimante")
})

public abstract class AbstractRessource {

	@Id
	@JsonView(ViewRessource.RessourceResponse.class)
	private String id;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@JsonView(ViewRessource.RessourceResponse.class)
	private Date date_livraison;

	@JsonView(ViewRessource.RessourceResponse.class)
	private long garantie;

	@JsonView(ViewRessource.RessourceResponse.class)
	private String marque;

	@DBRef
	@JsonView(ViewRessource.RessourceResponse.class)
	private Fournisseur fournisseur;

	@JsonView(ViewRessource.RessourceResponse.class)
	private Status status = Status.Disponible;

	@JsonView(ViewRessource.RessourceResponse.class)
	private boolean isReserve = false;

	public AbstractRessource(Date date_livraison, long garantie, String marque) {
		this.date_livraison = date_livraison;
		this.garantie = garantie;
		this.marque = marque;
	}

	public AbstractRessource(){

	}



}