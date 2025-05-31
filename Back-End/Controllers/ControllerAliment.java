package com.example.blue_app.Controllers;
import com.example.blue_app.Classes.Aliment;
import com.example.blue_app.Classes.AlimentDTO;
import com.example.blue_app.Services.ServiceAlimente;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/alimente")
public class ControllerAliment {

    private final ServiceAlimente listaProduse;

    public ControllerAliment(ServiceAlimente listaProduse) {
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

            } else {
                listaProduse.updateAliment(a);

            }
        }

        return ResponseEntity.ok("alimment adaugat");



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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAliment(@PathVariable Long id){
        if(listaProduse.findById(id)!=null){
            listaProduse.deleteAliment(id);
            return ResponseEntity.ok("aliment eliminat");
        }
        else{
            return ResponseEntity.badRequest().body("alimentul nu a fost gasit");
        }
    }




}
