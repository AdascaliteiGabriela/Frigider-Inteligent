package com.example.blue_app.Services;

import com.example.blue_app.Classes.AlimentDTO;
import com.example.blue_app.Classes.Reteta;
import com.example.blue_app.Exceptions.RetetaNotFoundException;
import com.example.blue_app.Exceptions.ReteteAlreadyExistsException;
import org.springframework.stereotype.Service;
import com.example.blue_app.Services.RepositoryRetete;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;


@Service
public class ServiceReteta {

   // public Map<Integer, List<AlimentDTO>> sugestii;
    private final ServiceAlimente serviceAlimente;
    private final RepositoryRetete repoRetete;


    public ServiceReteta(ServiceAlimente serviceAlimente, RepositoryRetete repoRetete) {
        this.serviceAlimente = serviceAlimente;
        this.repoRetete = repoRetete;
    }

    public List<Reteta> getRepoRetete() {
        return repoRetete.findAll().stream().map(r -> new Reteta(r.getDenumire(),r.getReteta())).collect(Collectors.toList());
    }

    public Reteta findById(Long idRetete) {
        return repoRetete.findById(idRetete).orElse(null);
    }

    public int adaugaRetete(Reteta reteta) {
        if(getReteteByDenumire(reteta.getDenumire()) != null) {
            throw new ReteteAlreadyExistsException("Reteta deja existenta");
        }
        repoRetete.save(reteta);
        return 0;

    }

    public Reteta updateReteta(Reteta retetaNoua) {
        // Căutăm rețeta existentă după denumire
        Reteta retetaExistenta = getReteteByDenumire(retetaNoua.getDenumire());

        if (retetaExistenta == null) {
            throw new RetetaNotFoundException("Reteta " + retetaNoua.getDenumire()+" nu exista");
        }


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

    public List<Reteta> findAll(){
        return repoRetete.findAll();
    }

    public int adaugaAlimentInRetete(String denumire,AlimentDTO alimentDTO) {
        Reteta retetaExistenta = getReteteByDenumire(denumire);
        if (retetaExistenta == null) {
            return 0;

        }
        List<AlimentDTO> alimente=retetaExistenta.getReteta();
        alimente.add(alimentDTO);
        retetaExistenta.setReteta(alimente);
       repoRetete.save(retetaExistenta);
       return 1;
    }



    public List<Reteta> sugestiiReteta(){
        List<Reteta>  retete = repoRetete.findAll();
        TreeMap<Integer,List<Reteta>> sugestii = new TreeMap<>();
        List<AlimentDTO> alimenteDisponibile = serviceAlimente.findAll();
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




        List<List<Reteta>> liste=sugestii.entrySet().stream().filter(entry->entry.getKey()>=2).map(Map.Entry::getValue)
                .collect(Collectors.toList());

        List<Reteta> reteteLista=new ArrayList<>();
        for (List<Reteta> l : liste) {
            reteteLista.addAll(l);
        }
        return reteteLista;
    }


}