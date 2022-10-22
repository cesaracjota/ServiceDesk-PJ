package com.cmms.servicedesk.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonaOrgano {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "n_id_personaorgano",columnDefinition = "serial2")
    private Integer idPersonaOrgano;

    @ManyToOne
    @JoinColumn(name = "n_id_persona", nullable = false)
    private Persona persona;

    @ManyToOne
    @JoinColumn(name = "n_id_organo", nullable = false)
    private Organo organo;
}
