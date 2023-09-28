package com.example.recourcesmanager.repositories;

import com.example.recourcesmanager.models.Constat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ConstatRepository extends MongoRepository<Constat , String> {
        List<Constat> findConstatsByHidded(boolean is_hidded);
}
