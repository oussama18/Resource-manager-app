package com.example.recourcesmanager.models;


import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "personne")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Administratif extends FacultePerson {

	private AdministrationGrade gradeAdministration;


}