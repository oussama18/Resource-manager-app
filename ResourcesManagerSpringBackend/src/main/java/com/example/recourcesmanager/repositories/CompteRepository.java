package com.example.recourcesmanager.repositories;
import com.example.recourcesmanager.models.AbstractCompte;
import com.example.recourcesmanager.models.FaculteCompte;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

@Repository
public interface CompteRepository extends MongoRepository<FaculteCompte, String> {

      FaculteCompte findByUserName(String username);

      void deleteByUserName(String username);

}
