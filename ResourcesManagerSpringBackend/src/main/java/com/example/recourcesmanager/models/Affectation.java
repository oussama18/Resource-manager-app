package com.example.recourcesmanager.models;


import com.example.recourcesmanager.DTO.ViewAffectation;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * @author PC
 * @version 1.0
 * @created 23-mars-2022 22:06:43
 */

@Document(collection = "affectation")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Affectation<affectationPerson> {
	@Id
	@JsonView(ViewAffectation.AffectationResponse.class)
	private String id;

	@DBRef
	@JsonView(ViewAffectation.AffectationResponse.class)
	private affectationPerson personelAffect;

	@DBRef
	@JsonView(ViewAffectation.AffectationResponse.class)
	private AbstractRessource ressource;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@JsonView(ViewAffectation.AffectationResponse.class)
	private Date date_affectation;


}