package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.exceptions.FTPErrors;
import com.cmms.servicedesk.ftpclient.FTPServiceImpl;
import com.cmms.servicedesk.model.*;
import com.cmms.servicedesk.service.*;
import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/incidencia/descripcion")
public class DescripcionIncidenciaController {

    @Autowired
    private DescripcionIncidenciaService descripcionIncidenciaService;

    @Autowired
    private HistorialIncidenciaService historialIncidenciaService;

    @Autowired
    private IncidenciaService incidenciaService;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private FTPServiceImpl ftpService;

    @Autowired
    private FtpService ftpCredencialesService;
    @Autowired
    private IEmailService EmailService;

    @Autowired
    private IncidenciaArchivosService incidenciaArchivosService;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd - HH:mm:ss");

    public DescripcionIncidenciaController(IEmailService emailService) {
        EmailService = emailService;
    }
    public DescripcionIncidenciaController() {
    }

    @GetMapping("/all")
    public ResponseEntity<List<DescripcionIncidencia>> findAll() {
        return ResponseEntity.ok(descripcionIncidenciaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DescripcionIncidencia> findById(@PathVariable("id") Integer id) {
        return descripcionIncidenciaService.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Value("${directorio.temporal}")
    private String base;
    private void SubirArchivo(MultipartFile archivo, String nombre, String carpeta, Ftp usuarioFtp) throws FTPErrors, IOException {

        //Se crean los datos para la subida de archivo
        File file = new File(base + nombre);
        try (OutputStream os = new FileOutputStream(file)) {
            os.write(archivo.getBytes());
        }
        try{
            ftpService.connectToFTP(usuarioFtp.getIp(), usuarioFtp.getUsuario(), usuarioFtp.getClave());
            ftpService.uploadFileToFTP(file, carpeta, nombre);
            ftpService.disconnectFTP();
        }catch (FTPErrors ftpe){
            throw ftpe;
        }
        //file.delete();

    }

    private String GenerarNombre(Integer idIncidencia, String nombreOriginal){
        int index = nombreOriginal.lastIndexOf('.') + 1;
        String extension = nombreOriginal.substring(index);
        return "atencion_" + idIncidencia + "." + extension;
    }


    @PostMapping("/save")
    public ResponseEntity<DescripcionIncidencia> save(@ModelAttribute("descripcionIncidencia") DescripcionIncidencia descripcionIncidencia, @RequestParam(value = "archivo", required = false) MultipartFile archivo) {
        try {
            Incidencia incidencia = incidenciaService.findById(descripcionIncidencia.getIncidencia().getIdIncidencia()).get();
            HistorialIncidencia historialIncidencia = historialIncidenciaService.findByIncidenciaAndEstado(incidencia,'A');
            String correoRemitente = historialIncidencia.getIncidencia().getPersona().getCorreo();
            historialIncidencia.setEstado('N');
            historialIncidenciaService.update(historialIncidencia);
            HistorialIncidencia historialIncidencia1 = new HistorialIncidencia();
            historialIncidencia1.setIncidencia(incidencia);
            historialIncidencia1.setFecha(ZonedDateTime.now());
            historialIncidencia1.setEstadoIncidencia('A');
            historialIncidencia1.setEstado('A');
            historialIncidencia1.setPersona_asignado(historialIncidencia.getPersona_asignado());
            historialIncidencia1.setPersona_registro(historialIncidencia.getPersona_registro());
            historialIncidencia1.setPersona_notifica(historialIncidencia.getPersona_notifica());
            historialIncidencia1.setIp(incidenciaService.getClientIp(request));
            if (archivo != null) {
                Ftp archivo_tecnico = ftpCredencialesService.findById(1).get();
                String nombreArchivo = GenerarNombre(incidencia.getIdIncidencia(),archivo.getOriginalFilename());
                LocalDate today = LocalDate.now();
                String carpeta = today.format(DateTimeFormatter.ofPattern("yyyy/MM"));
                SubirArchivo(archivo, nombreArchivo, carpeta, archivo_tecnico);
                IncidenciaArchivos incidenciaArchivos = incidenciaArchivosService.create(new IncidenciaArchivos(1, carpeta, nombreArchivo, 'T'));
                descripcionIncidencia.setIncidenciaArchivos(incidenciaArchivos);
            }
            if (correoRemitente != null){
                if(!correoRemitente.isEmpty()) {
                    String regx = "^[A-Za-z0-9+_.-]+@(.+)$";
                    Pattern pattern = Pattern.compile(regx);
                    Matcher matcher = pattern.matcher(correoRemitente);
                    if (!matcher.find()) {
                        System.out.println("CORREO DEL REMITENTE INVALIDO");
                    } else {
                        EmailService.sendEmail("HA SIDO ATENDIDA SU INCIDENCIA", "INCIDENCIA ATENDIDA", incidencia.getOrigen().getOrigen(), incidencia.getMotivo().getMotivo(), historialIncidencia.getPersona_asignado().getNombre() + " " + historialIncidencia.getPersona_asignado().getApellido(), incidencia.getFecha().toLocalDateTime().format(formatter), correoRemitente);
                    }
                }else {
                    System.out.println("CORREO DEL REMITENTE VACIO");
                }
            } else {
                System.out.println("CORREO DEL REMITENTE NULO");
            }
            historialIncidenciaService.create(historialIncidencia1);
            return ResponseEntity.ok(descripcionIncidenciaService.create(descripcionIncidencia));
        } catch (FTPErrors | IOException ftpErrors){
            System.out.println("Error al subir archivo");
        }
       return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<DescripcionIncidencia> update(DescripcionIncidencia descripcionIncidencia) {
        return ResponseEntity.ok(descripcionIncidenciaService.update(descripcionIncidencia));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
        descripcionIncidenciaService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/incidencia/{id}")
    public ResponseEntity<DescripcionIncidencia> findByIncidencia(@PathVariable("id") Integer idIncidencia) {
        Incidencia incidencia = incidenciaService.findById(idIncidencia).get();
        descripcionIncidenciaService.findByIncidencia(incidencia);
        return ResponseEntity.ok().build();
    }

}
