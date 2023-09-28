package com.example.recourcesmanager.models;


import com.example.recourcesmanager.DTO.ViewDepartement;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;
import org.springframework.data.annotation.Id;
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
public abstract class Departement {

	@Id
	@JsonView(ViewDepartement.DepartementResponse.class)
	private String id;

	@JsonView(ViewDepartement.DepartementResponse.class)
	private String nomDepartement;

}