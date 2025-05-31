package com.example.blue_app.Classes;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Aliment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    private float numarKcal;
    private String denumire;
    private Date date;
    private int cantitate;

    public Aliment() {
        numarKcal =0.0f;
        denumire ="";
        date = new Date();
        cantitate = 0;
    }
    public Aliment(float numarKcal, String denumire, Date date,int cantitate) {
        this.numarKcal = numarKcal;
        this.denumire = denumire;
        this.date = date;
        this.cantitate = cantitate;
    }

    public Aliment(Aliment a) {
        this.numarKcal = a.getNumarKcal();
        this.denumire = a.getDenumire();
        this.date = a.getDate();
    }

    public float getNumarKcal() {
        return numarKcal;
    }

    public void setNumarKcal(float numarKcal) {
        this.numarKcal = numarKcal;
    }

    public String getDenumire() {
        return denumire;
    }

    public void setDenumire(String denumire) {
        this.denumire = denumire;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getCantitate() {
        return cantitate;
    }
    public void setCantitate(int cantitate) {
        this.cantitate = cantitate;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Aliment{");
        sb.append("numarKcal=").append(numarKcal);
        sb.append(", denumire='").append(denumire).append('\'');
        sb.append("cantitate='").append(cantitate).append('\'');
        sb.append(", date=").append(date);
        sb.append('}');
        return sb.toString();
    }
}
