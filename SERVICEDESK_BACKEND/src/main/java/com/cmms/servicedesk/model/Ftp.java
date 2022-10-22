package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ftp")
public class Ftp {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_ftp")
    private Integer id;

    @Column(name = "s_descripcion")
    private String descripcion;

    @Column(name = "c_estado")
    private char estado;

    @Column(name = "s_ip")
    private String ip;

    @Column(name = "s_usuario")
    private String usuario;

    @Column(name = "s_clave")
    private String clave;
}
