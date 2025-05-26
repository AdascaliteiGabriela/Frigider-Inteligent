package com.example.blue_app.Classes;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collector;

@Entity
public class Reteta {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ElementCollection
    private List<AlimentDTO> reteta;
    private String denumire;



    public Reteta() {
        denumire = "0";
        reteta = new ArrayList<>();
    }
     public Reteta(String denumire,List<AlimentDTO> reteta) {
        this.denumire = denumire;
        this.reteta=new ArrayList<>(reteta);
     }

    public Reteta(Reteta reteta) {
        if (reteta != null) {
            this.id = reteta.getId();
            this.denumire = reteta.getDenumire();
            this.reteta = reteta.getReteta();

        }
        else {
            denumire = "0";

        };
    }


    public String getDenumire() {
        return denumire;
    }

    public void setDenumire(String denumire) {
        this.denumire = denumire;
    }

    public List<AlimentDTO> getReteta() {
        List<AlimentDTO> copie=new ArrayList<AlimentDTO>();
        for(AlimentDTO aliment:reteta){
            copie.add(aliment);
        }
        return copie;
    }


    public void setReteta(List<AlimentDTO> reteta) {
        this.reteta = new ArrayList<>();
        for(AlimentDTO alimentDTO:reteta){
            this.reteta.add(alimentDTO);
        }
    }

    public AlimentDTO getAlimentReteta(int id){
        return reteta.get(id);
    }

    public void addAlimentReteta(AlimentDTO alimentDTO) {
        reteta.add(alimentDTO);
    }


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }



}
