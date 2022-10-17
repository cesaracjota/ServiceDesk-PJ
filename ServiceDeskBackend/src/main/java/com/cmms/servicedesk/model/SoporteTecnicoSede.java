package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SoporteTecnicoSede {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_soporte_tecnico_sede")
    private Integer idSoporteTecnicoSede;

    @ManyToOne
    @JoinColumn(name = "n_id_sede", nullable = false, columnDefinition = "smallint")
    private Sede sede;

    @ManyToOne
    @JoinColumn(name = "n_id_organo", nullable = false, columnDefinition = "smallint")
    private Organo organo;

    @ManyToOne
    @JoinColumn(name = "n_id_oficina", nullable = true, columnDefinition = "smallint")
    private Oficina oficina;

    @ManyToOne
    @JoinColumn(name = "n_id_persona", nullable = false)
    private Persona persona;

    @Column(name = "s_activo", nullable = false, columnDefinition = "char(1)", length = 1)
    private char activo;

    @ManyToOne
    @JoinColumn(name = "id_persona_logueado", nullable = false)
    private Persona idPersonaLogueado;

    @Column(name = "fh_fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "s_ip_pc",nullable = false)
    private String IP;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SoporteTecnicoSede that = (SoporteTecnicoSede) o;
        return Objects.equals(idSoporteTecnicoSede, that.idSoporteTecnicoSede);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idSoporteTecnicoSede);
    }
}
