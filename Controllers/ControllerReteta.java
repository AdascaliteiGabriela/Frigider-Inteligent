package com.example.blue_app.Controllers;

import com.example.blue_app.Classes.Reteta;
import com.example.blue_app.Services.ReteteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.TreeMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/retete")
public class ControllerReteta {

    private final ReteteService reteteService;

    public ControllerReteta(ReteteService reteteService) {
        this.reteteService = reteteService;
    }

    @PostMapping
    public ResponseEntity<?> adaugaReteta(@RequestBody Reteta retete) {
        reteteService.adaugaRetete(retete);

        return ResponseEntity.ok("reteta adaugata cu succes");

    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getRetetaId(@PathVariable Long id) {
       Reteta ret=reteteService.findById(id);

       return ResponseEntity.ok(ret);

    }

    @GetMapping("/sugerate")
    public List<Reteta> getReteteSugerate() {
        TreeMap<Integer, List<Reteta>> sugestii = reteteService.sugestiiReteta();

        // Ia toate rețetele care au scor > 0 (adică sugerate)
        return sugestii.entrySet().stream()
                .filter(entry -> entry.getKey() > 0)  // scor mai mare decât 0
                .flatMap(entry -> entry.getValue().stream())
                .collect(Collectors.toList());
    }
}