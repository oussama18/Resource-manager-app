package com.example.recourcesmanager.models;


import com.example.recourcesmanager.DTO.ViewPersonne;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

/**
 * @author PC
 * @version 1.0
 * @created 23-mars-2022 22:06:44
 */

@Document(collection = "personne")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		property = "type")
@JsonSubTypes({
		@JsonSubTypes.Type(value = FacultePerson.class, name = "personne"),
		@JsonSubTypes.Type(value = Enseignant.class, name = "enseignant"),
		@JsonSubTypes.Type(value = Administratif.class, name = "administratif"),
		@JsonSubTypes.Type(value = Technicien.class, name = "technicien")
})
public abstract class Personne {
	@Id
	@JsonView({ViewPersonne.PersonneResponse.class})
	private String id;
	@NotNull
	@Size(max=50)
	@JsonView({ViewPersonne.PersonneResponse.class})
	private String email;



	@NotNull
	@Size(max=20)
	@JsonView({ViewPersonne.PersonneResponse.class})
	private String nom;

	@NotNull
	@Size(max=20)
	@JsonView({ViewPersonne.PersonneResponse.class})
	private String prenom;
	public Personne(String email, String nom, String prenom) {
		this.email = email;
		this.nom = nom;
		this.prenom = prenom;
	}

}