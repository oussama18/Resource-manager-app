package com.example.recourcesmanager.repositories;

import com.example.recourcesmanager.models.Roles;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends MongoRepository<Roles,String> {

    Optional<Roles> findFirstByName(String s);

}
