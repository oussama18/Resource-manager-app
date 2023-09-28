package com.example.recourcesmanager.models;


import com.example.recourcesmanager.DTO.ViewDepartement;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author PC
 * @version 1.0
 * @created 23-mars-2022 22:06:44
 */

@Document(collection = "departement")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FaculteDepartement extends Departement {

	@DBRef
	@JsonView(ViewDepartement.DepartementResponse.class)
	private Administratif chefDepartement;

}