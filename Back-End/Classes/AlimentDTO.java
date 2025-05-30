package com.example.blue_app.Classes;

import jakarta.persistence.Embeddable;

import java.util.Date;

@Embeddable
public class AlimentDTO {

    private float numarKcal;
    private String denumire;
    private Date date;
    private int cantitate;
    public AlimentDTO() {
        numarKcal =0.0f;
        denumire ="";
        date = new Date();
        cantitate = 0;
    }
    public AlimentDTO(String denumire,float numarKcal, Date date, int cantitate) {
        this.numarKcal = numarKcal;
        this.denumire = denumire;
        this.date = date;
        this.cantitate = cantitate;
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

}
