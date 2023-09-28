package com.example.recourcesmanager.models;


import com.example.recourcesmanager.DTO.ViewPersonne;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

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
public class FacultePerson extends Personne {

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@JsonView({ViewPersonne.PersonneResponse.class})
	private Date date_recr;

	@DBRef
	@JsonView({ViewPersonne.PersonneResponse.class})
	private FaculteDepartement m_FaculteDepartement;

	public FacultePerson(String email, String nom, String prenom, Date date_recr, FaculteDepartement m_FaculteDepartement) {
		super(email, nom, prenom);
		this.date_recr = date_recr;
		this.m_FaculteDepartement = m_FaculteDepartement;
	}

	public FacultePerson(String email, String nom, String prenom, Date date_recr) {
		super(email, nom, prenom);
		this.date_recr = date_recr;
	}
}