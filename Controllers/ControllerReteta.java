package com.example.blue_app.Controllers;

import com.example.blue_app.Classes.AlimentDTO;
import com.example.blue_app.Classes.Reteta;
import com.example.blue_app.Exceptions.RetetaNotFoundException;
import com.example.blue_app.Services.ServiceReteta;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/retete")
public class ControllerReteta {

    private final ServiceReteta serviceReteta;

    public ControllerReteta(ServiceReteta serviceReteta) {
        this.serviceReteta = serviceReteta;
    }

    @GetMapping
    public List<Reteta> getRetete() {
        return serviceReteta.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRetetaId(@PathVariable Long id) {
        Reteta ret= serviceReteta.findById(id);

        return ResponseEntity.ok(ret);

    }

    @GetMapping("/sugerate")
    public List<Reteta> getReteteSugerate() {
        return serviceReteta.sugestiiReteta();
    }


    @PutMapping("/actualizare")
    public ResponseEntity<?> actualizareRetete(@RequestBody Reteta reteta) {
        Reteta actual=serviceReteta.updateReteta(reteta);
        return ResponseEntity.ok().body("Reteta "+ actual.getDenumire()+" actualizata");

    }


    @PostMapping
    public ResponseEntity<?> adaugaReteta(@RequestBody Reteta retete) {

            int ok= serviceReteta.adaugaRetete(retete);
            if(ok==0){
            return ResponseEntity.ok("reteta a fost adaugata cu succes");}

            return ResponseEntity.badRequest().body("reteta deja existenta");


    }

    @PostMapping("/lista-retete")
    public ResponseEntity<?> adaugaMaiMulteRetete(@RequestBody List<Reteta> retete) {
        int ok=0;
        for (Reteta reteta : retete) {
            ok= serviceReteta.adaugaRetete(reteta);
        }
        if(ok==0){
            return ResponseEntity.ok("reteta a fost adaugata cu succes");}

        return ResponseEntity.badRequest().body("reteta deja existenta");

    }



    @PutMapping("/{denumire}/adauga")
    public ResponseEntity<?> adaugaAlimentInReteta(@PathVariable String denumire, @RequestBody AlimentDTO alimentDTO) {
       int ok   = serviceReteta.adaugaAlimentInRetete(denumire,alimentDTO);
         if(ok==1)
        return ResponseEntity.ok().body("aliment adaugat in reteta");
       throw new RetetaNotFoundException("Retete not found");


    }




//    @GetMapping("/{denumire}")
//    public ResponseEntity<?> getRetetaDenumire(@PathVariable String denumire) {
//        Reteta ret=reteteService.getReteteByDenumire(denumire);
//        return ResponseEntity.ok(ret);
//    }


}