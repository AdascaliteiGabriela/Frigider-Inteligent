package com.example.blue_app.Services;
//import org.springframework.web.bind.annotation.RestController;

import com.example.blue_app.Classes.Aliment;
import com.example.blue_app.Classes.AlimentDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceAlimente {

    private final RepositoryAlimente repoA;
    public ServiceAlimente(RepositoryAlimente repoA) {
       this.repoA = repoA;
    }

    public Aliment adaugaAliment(AlimentDTO dto) {
        Aliment a=new Aliment();
        a.setCantitate(dto.getCantitate());
        a.setNumarKcal(dto.getNumarKcal());
        a.setDate(dto.getDate());
        a.setDenumire(dto.getDenumire());
        return repoA.save(a);
    }

    public List<AlimentDTO> findAll() {
        return repoA.findAll().stream().map(a->new AlimentDTO(a.getDenumire(),a.getNumarKcal(),a.getDate(),a.getCantitate())).collect(Collectors.toList());
    }

    public Aliment findById(Long id) {
        return repoA.findById(id).orElse(null);
    }

    public void deleteAliment(Long id) {
        repoA.deleteById(id);
    }

    public void updateAliment(AlimentDTO dto) {
        List<Aliment> aliments = repoA.findAll();
        for (Aliment aliment1 : aliments) {
            if(aliment1.getDenumire().equals(dto.getDenumire())){
                int cantitate = aliment1.getCantitate()+aliment1.getCantitate();
                aliment1.setCantitate(cantitate);
            }
        }
        repoA.saveAll(aliments);
    }

    public int AlimentExistent(AlimentDTO dto) {
        List<Aliment> aliments = repoA.findAll();
        int ok=0;
        for (Aliment aliment1 : aliments) {
            if(aliment1.getDenumire().equals(dto.getDenumire())){
                ok=1;
            }
        }
        return ok;
    }






}
