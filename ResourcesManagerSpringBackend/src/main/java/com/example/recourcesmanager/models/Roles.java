package com.example.recourcesmanager.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Roles {
   private String id;
   private CompteRole name;

   public Roles(CompteRole name) {
      this.name = name;
   }
}
