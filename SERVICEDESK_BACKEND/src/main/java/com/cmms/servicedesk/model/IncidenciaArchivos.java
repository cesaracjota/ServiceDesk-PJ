package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncidenciaArchivos {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_incidencia_archivos")
    private Integer id;

    @Column(name = "s_carpeta_pdf")
    private String carpeta;

    @Column(name = "s_file_pdf")
    private  String file;
//  usuario R=registro T=tecnico
    @Column(name = "c_usuario")
    private char usuario;
}
