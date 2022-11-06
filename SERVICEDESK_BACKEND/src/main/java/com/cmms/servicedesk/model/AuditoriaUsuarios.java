package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuditoriaUsuarios {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_auditoria_usuario",columnDefinition = "serial2")
    private Integer idAuditoriaUsuario;

    @Column(name = "s_dni_usuario" , length = 8, columnDefinition = "char(8)")
    private String dni;

    @CreatedDate
    @Column(name = "fh_fecha_registro", updatable = false)
    private ZonedDateTime fecha;

    @Column(name = "s_ip_pc", nullable = true)
    private String IP;
}
