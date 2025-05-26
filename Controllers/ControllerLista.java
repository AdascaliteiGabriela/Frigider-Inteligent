package com.example.blue_app.Controllers;
import com.example.blue_app.Classes.Aliment;
import com.example.blue_app.Classes.AlimentDTO;
import com.example.blue_app.Services.ListaService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/alimente")
public class ControllerLista {

    private final ListaService listaProduse;

    public ControllerLista(ListaService listaProduse) {
        this.listaProduse = listaProduse;
    }

    @GetMapping
    public List<AlimentDTO> getListaProduse(){
        return listaProduse.findAll();
    }

    @PostMapping
    public ResponseEntity<?> adaugaAliment(@RequestBody List<AlimentDTO> nou){

        for(AlimentDTO a:nou) {


            int ok = listaProduse.AlimentExistent(a);
            if (ok == 0) {
                listaProduse.adaugaAliment(a);
                //return ResponseEntity.ok("alimment adaugat");
            } else {
                listaProduse.updateAliment(a);
                //return ResponseEntity.ok("alimentul adaugat era deja prezent in frigider, am crescut cantitatea");
            }
        }

        return ResponseEntity.ok("alimment adaugat");

       // return ResponseEntity.ok("alimentul adaugat era deja prezent in frigider, am crescut cantitatea");

    }

    @PatchMapping
    public ResponseEntity<?> updateAliment(@RequestBody AlimentDTO aliment){
            listaProduse.updateAliment(aliment);
            return ResponseEntity.ok("alimente actualizat");
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getAlimentAtIndex(@PathVariable Long id) {
        Aliment nou=listaProduse.findById(id);
        if (nou==null){
            return ResponseEntity.notFound().build();
        }
        else{
            AlimentDTO nouDTO=new AlimentDTO(nou.getDenumire(), nou.getNumarKcal(), nou.getDate(), nou.getCantitate());
            return ResponseEntity.ok(nouDTO);
        }

    }




}
