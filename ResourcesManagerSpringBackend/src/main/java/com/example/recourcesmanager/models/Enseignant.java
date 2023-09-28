package com.example.recourcesmanager.models;


import com.example.recourcesmanager.DTO.ViewPersonne;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;


@Document(collection = "personne")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Enseignant extends FacultePerson {
	@NotNull
	private String Domaine_d_expert;
	@NotNull
	@JsonView({ViewPersonne.PersonneResponse.class})
	private String Labo;

	public Enseignant(String email, String nom, String prenom, Date date_recr, FaculteDepartement m_FaculteDepartement, String domaine_d_expert, String labo) {
		super(email, nom, prenom, date_recr, m_FaculteDepartement);
		Domaine_d_expert = domaine_d_expert;
		Labo = labo;
	}

	public Enseignant(String email, String nom, String prenom, Date date_recr, String labo) {
		super(email, nom, prenom, date_recr);
		Labo = labo;
	}
}
