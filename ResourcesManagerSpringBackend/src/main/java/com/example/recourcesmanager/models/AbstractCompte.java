package com.example.recourcesmanager.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Document(collection = "compte")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public abstract class AbstractCompte {

	@Id
	private String id;

	@DBRef
	@NotNull
	private Personne m_Personne;

	public AbstractCompte(Personne m_Personne) {
		this.m_Personne = m_Personne;
	}
}