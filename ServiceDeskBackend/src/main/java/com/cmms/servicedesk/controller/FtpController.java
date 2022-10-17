package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.model.Ftp;
import com.cmms.servicedesk.service.FtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/ftp")
public class FtpController {

    @Autowired
    private FtpService ftpService;

    @GetMapping("/listAll")
    public ResponseEntity<List<Ftp>> findAll() {
        return ResponseEntity.ok(ftpService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ftp> findById(@PathVariable("id") Integer idFtp){
        return ftpService.findById(idFtp)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Ftp> create(@Valid @RequestBody Ftp ftp){
        return new ResponseEntity<>(ftpService.create(ftp), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Ftp> update(@Valid @RequestBody Ftp ftp){
        return ftpService.findById(ftp.getId())
                .map(s -> ResponseEntity.ok(ftpService.update(ftp)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Ftp> updateActivo(@PathVariable("id") Integer idFtp){
        return ftpService.findById(idFtp)
                .map(c -> {
                    char activo = c.getEstado();
                    if(activo == 'S'){
                        c.setEstado('N');
                    } else {
                        c.setEstado('S');
                    }
                    ftpService.update(c);
                    return ResponseEntity.ok(c);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
