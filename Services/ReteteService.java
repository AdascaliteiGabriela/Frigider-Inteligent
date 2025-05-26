package com.example.blue_app.Services;

import com.example.blue_app.Classes.AlimentDTO;
import com.example.blue_app.Classes.Reteta;
import org.springframework.stereotype.Service;
import com.example.blue_app.Repositories.RepositoryRetete;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;


@Service
public class ReteteService {

   // public Map<Integer, List<AlimentDTO>> sugestii;
    private final ListaService listaService;
    private final RepositoryRetete repoRetete;


    public ReteteService(ListaService listaService, RepositoryRetete repoRetete) {
        this.listaService = listaService;
        this.repoRetete = repoRetete;
    }

    public List<Reteta> getRepoRetete() {
        return repoRetete.findAll().stream().map(r -> new Reteta(r.getDenumire(),r.getReteta())).collect(Collectors.toList());
    }

    public Reteta findById(Long idRetete) {
        return repoRetete.findById(idRetete).orElse(null);
    }

    public void adaugaRetete(Reteta reteta) {
        repoRetete.save(reteta);
    }

    public Reteta updateReteta(Reteta retetaNoua) {
        // Căutăm rețeta existentă după denumire
        Reteta retetaExistenta = getReteteByDenumire(retetaNoua.getDenumire());

        if (retetaExistenta == null) {
            throw new RuntimeException("Rețeta cu denumirea '" + retetaNoua.getDenumire() + "' nu a fost găsită.");
        }

        // Actualizăm lista de alimente (sau orice alt câmp dorești)
        retetaExistenta.setReteta(retetaNoua.getReteta());

        return repoRetete.save(retetaExistenta);
    }

    public Reteta getReteteByDenumire(String denumire) {
        List<Reteta>  retetes = repoRetete.findAll();
        for (Reteta retete : retetes) {
            if (retete.getDenumire().equals(denumire)) {
                return retete;
            }
        }
        return null;
    }



    public TreeMap<Integer,List<Reteta>> sugestiiReteta(){
        List<Reteta>  retete = repoRetete.findAll();
        TreeMap<Integer,List<Reteta>> sugestii = new TreeMap<>();
        List<AlimentDTO> alimenteDisponibile = listaService.findAll();
        for (Reteta r: retete) {
            int scor=0;
            for (AlimentDTO al: r.getReteta()) {
                int gasit=0;
                for(AlimentDTO a: alimenteDisponibile) {
                    if(a.getDenumire().equals(al.getDenumire()) && a.getCantitate()>=al.getCantitate()) {
                        gasit++;
                        break;
                    }
                }
                    if(gasit>0)
                        scor++;
            }
//            if(scor>0){
//                if(!sugestii.containsKey(scor)){
//                    sugestii.put(scor,new ArrayList<>());
//                }
//                sugestii.get(scor).add(r);
//            }
            sugestii.computeIfAbsent(scor, k -> new ArrayList<>()).add(r);

        }




        return sugestii;
    }


}
