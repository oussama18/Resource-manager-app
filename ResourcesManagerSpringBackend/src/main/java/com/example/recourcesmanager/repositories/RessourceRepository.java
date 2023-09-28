package com.example.recourcesmanager.repositories;
import com.example.recourcesmanager.models.AbstractRessource;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RessourceRepository extends  MongoRepository<AbstractRessource, String>{


}
