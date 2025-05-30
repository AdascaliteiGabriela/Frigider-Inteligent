package com.example.blue_app.Services;

import com.example.blue_app.Classes.Aliment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryAlimente extends JpaRepository<Aliment,Long> {

}