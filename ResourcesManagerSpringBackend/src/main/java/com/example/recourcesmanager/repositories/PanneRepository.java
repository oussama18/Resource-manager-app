package com.example.recourcesmanager.repositories;

import com.example.recourcesmanager.models.FacultePerson;
import com.example.recourcesmanager.models.Panne;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PanneRepository extends MongoRepository<Panne , String> {
  List<Panne> findPannesByIsTraited (boolean is_traited);
  List<Panne> findByPerson(String username);
}
