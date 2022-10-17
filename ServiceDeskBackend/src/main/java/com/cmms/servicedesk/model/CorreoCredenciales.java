package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CorreoCredenciales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "n_id_correo_credenciales")
    private Integer idCorreoCredenciales;

    @Column(name = "s_correo", length = 80)
    private String correo;

    @Column(name = "s_password")
    private String password;

    @Column(name = "s_activo", length = 1, columnDefinition = "char(1)")
    private char activo;

    @Column(name = "fecha")
    private ZonedDateTime fecha;
}
