package com.example.blue_app.Services;

import com.example.blue_app.Classes.Reteta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryRetete extends JpaRepository<Reteta, Long> {

}
