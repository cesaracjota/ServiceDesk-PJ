package com.cmms.servicedesk.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "n_id_persona")
    private Integer idpersona;

    @NotNull(message = "El campo nombre no puede ser null")
    @NotBlank(message = "El campo nombre minimo tiene que tener 3 carateres")
    @Size(min = 3 , max = 80)
    @Column(name = "s_nombre" , length = 80)
    private String nombre;

    @NotNull(message = "El campo apellido no puede ser null")
    @NotBlank(message = "El campo apellido minimo tiene que tener 3 carateres")
    @Size(min = 3 , max = 80)
    @Column(name = "s_apellido" , length = 80)
    private String apellido;


    @NotNull(message = "El campo DNI no puede ser null")
    @Column(name = "s_dni" , length = 8 , columnDefinition = "char(8)",unique = true)
    private String dni;

    @NotNull(message = "El campo usuario no puede ser null")
    @Column(name = "s_usuario" , length = 8 , columnDefinition = "char(8)",unique = true)
    private String usuario;

    @NotBlank(message = "El campo password minimo tiene que tener 6 carateres")
    @Size(min = 6, message = "El campo password minimo tiene que tener 6 carateres")
    @Column(name = "s_password")
    private String password;

    @Column(name = "s_correo", length = 80)
    private String correo;

    @Column(name = "s_celular", length = 15)
    private String celular;

    @Column(name = "s_telefono", length = 30)
    private String telefono;

    @Column(name = "s_anexo", length = 10)
    private String anexo;

    @Column(name = "f_fecha_nacimiento")
    private LocalDate fecha;

    @Column(name = "s_sexo", length = 1, columnDefinition = "char(1)")
    private char sexo;

    @NotNull(message = "El campo estado no puede ser null")
    @Column(name = "s_activo", length = 1, columnDefinition = "char(1)")
    private char activo;

    @ManyToOne
    @JoinColumn(name = "n_id_perfil", nullable = false,columnDefinition = "smallint")
    private PerfilPersona perfilPersona;

}
