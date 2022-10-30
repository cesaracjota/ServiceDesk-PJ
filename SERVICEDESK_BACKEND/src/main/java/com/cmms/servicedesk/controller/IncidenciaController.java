package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.exceptions.FTPErrors;
import com.cmms.servicedesk.ftpclient.FTPServiceImpl;
import com.cmms.servicedesk.model.*;
import com.cmms.servicedesk.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/incidencias")
public class IncidenciaController {
    @Autowired
    private IncidenciaService incidenciaService;
    @Autowired
    private HistorialPersonaService historialPersonaService;
    @Autowired
    private PersonaService personaService;
    @Autowired
    private HttpServletRequest request;

    @Autowired
    private PersonaOrganoService personaOrganoService;

    @Autowired
    private EstadoTecnicoService estadoTecnicoService;

    @Autowired
    private HistorialIncidenciaService historialIncidenciaService;

    private final IEmailService EmailService;
    @Autowired
    private FTPServiceImpl ftpService;

    @Autowired
    private FtpService ftpCredencialesService;

    @Autowired
    private IncidenciaArchivosService incidenciaArchivosService;
    @Autowired
    private DescripcionIncidenciaService descripcionIncidenciaService;

    @Autowired
    private CorreoCredencialesService correoCredencialesService;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd - HH:mm:ss");

    public IncidenciaController(IEmailService emailService) {
        EmailService = emailService;
    }

    @GetMapping
    public ResponseEntity<List<Incidencia>> findAll() {
        List<Incidencia> incidencias = incidenciaService.findAll();
        incidencias.forEach(incidencia -> {
            List<HistorialIncidencia> historialIncidencia = historialIncidenciaService.findByIncidencia(incidencia);
            List<DescripcionIncidencia> descripcionIncidencia = descripcionIncidenciaService.findByIncidencia(incidencia);
            if (descripcionIncidencia.size() == 1 ) {
                DescripcionIncidencia descripcion = descripcionIncidencia.get(0);
                descripcion.setIncidencia(null);
                incidencia.setDescripcionIncidencia(descripcion);
            }
            historialIncidencia.forEach(historial -> {
                historial.setIncidencia(null);
            });
            incidencia.setHistorialIncidencia(historialIncidencia);
        });

        return ResponseEntity.ok(incidencias);
    }

    @GetMapping("/persona/detalles/{id}")
    public ResponseEntity<Incidencia> findById(@PathVariable("id") Integer idIncidencia){
        return incidenciaService.findById(idIncidencia)
                .map(
                        incidencia -> {
                            List<HistorialIncidencia> historialIncidencia = historialIncidenciaService.findByIncidencia(incidencia);
                            historialIncidencia.forEach(historial -> {
                                historial.setIncidencia(null);
                            });
                            List<DescripcionIncidencia> descripcionIncidencia = descripcionIncidenciaService.findByIncidencia(incidencia);
                            if (descripcionIncidencia.size() == 1 ) {
                                DescripcionIncidencia descripcion = descripcionIncidencia.get(0);
                                descripcion.setIncidencia(null);
                                incidencia.setDescripcionIncidencia(descripcion);
                            }
                            incidencia.setHistorialIncidencia(historialIncidencia);
                            return ResponseEntity.ok(incidencia);
                        }
                )
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/persona/{id}")
    public ResponseEntity<List<Incidencia>> findByPersona(@PathVariable("id") Integer idPersona){
        Persona persona = personaService.findById(idPersona).get();
        List<Incidencia> incidencias = incidenciaService.findByPersona(persona);
        incidencias.forEach(incidencia -> {
            List<HistorialIncidencia> historialIncidencia = historialIncidenciaService.findByIncidencia(incidencia);
            historialIncidencia.forEach(historial -> {
                historial.setIncidencia(null);
            });
            List<DescripcionIncidencia> descripcionIncidencia = descripcionIncidenciaService.findByIncidencia(incidencia);
            if (descripcionIncidencia.size() == 1 ) {
                DescripcionIncidencia descripcion = descripcionIncidencia.get(0);
                descripcion.setIncidencia(null);
                incidencia.setDescripcionIncidencia(descripcion);
            }
            incidencia.setHistorialIncidencia(historialIncidencia);
        });
        return ResponseEntity.ok(incidencias);
    }

    @GetMapping("/persona/asignado/{id}")
    public ResponseEntity<List<Incidencia>> findByPersonaAsignado(@PathVariable("id") Integer idPersona){
        Persona persona = personaService.findById(idPersona).get();
        List<HistorialIncidencia> historialIncidencia = historialIncidenciaService.findByPersonaAsignado(persona);
        List<Incidencia> incidencia = historialIncidencia.stream().map(HistorialIncidencia::getIncidencia).collect(java.util.stream.Collectors.toList());
        incidencia.stream().forEach(i -> {
            List<HistorialIncidencia> historialIncidencia1 = historialIncidenciaService.findByIncidencia(i);
            historialIncidencia1.forEach(historial -> {
                historial.setIncidencia(null);
            });
            List<DescripcionIncidencia> descripcionIncidencia = descripcionIncidenciaService.findByIncidencia(i);
            if (descripcionIncidencia.size() == 1 ) {
                DescripcionIncidencia descripcion = descripcionIncidencia.get(0);
                descripcion.setIncidencia(null);
                i.setDescripcionIncidencia(descripcion);
            }
            i.setHistorialIncidencia(historialIncidencia1);
        });

        return ResponseEntity.ok(incidencia);
    }

    @GetMapping("/persona/asignados")
    public ResponseEntity<List<Incidencia>> findByPersonaAsignados(){
        List<HistorialIncidencia> historialIncidencia = historialIncidenciaService.findByPersona_asignadoIsNotNull();
        List<Incidencia> incidencia = historialIncidencia.stream().map(HistorialIncidencia::getIncidencia).collect(java.util.stream.Collectors.toList());
        incidencia.stream().forEach(i -> {
            List<HistorialIncidencia> historialIncidencia1 = historialIncidenciaService.findByIncidencia(i);
            historialIncidencia1.forEach(historial -> {
                historial.setIncidencia(null);
            });
            List<DescripcionIncidencia> descripcionIncidencia = descripcionIncidenciaService.findByIncidencia(i);
            if (descripcionIncidencia.size() == 1 ) {
                DescripcionIncidencia descripcion = descripcionIncidencia.get(0);
                descripcion.setIncidencia(null);
                i.setDescripcionIncidencia(descripcion);
            }
            i.setHistorialIncidencia(historialIncidencia1);
        });
        return ResponseEntity.ok(incidencia);
    }

    @GetMapping("/persona/noasignados")
    public ResponseEntity<List<Incidencia>> findByPersonaNoAsignados(){
        List<HistorialIncidencia> historialIncidencia = historialIncidenciaService.findByPersona_asignadoIsNull();
        if (historialIncidencia.isEmpty()) {
            return ResponseEntity.notFound().build();
        }else {
            List<Incidencia> incidencia = historialIncidencia.stream().map(HistorialIncidencia::getIncidencia).collect(java.util.stream.Collectors.toList());
            incidencia.forEach(i -> {
                List<HistorialIncidencia> historialIncidencia1 = historialIncidenciaService.findByIncidencia(i);
                historialIncidencia.forEach(historial -> {
                    historial.setIncidencia(null);
                });
                List<DescripcionIncidencia> descripcionIncidencia = descripcionIncidenciaService.findByIncidencia(i);
                if (descripcionIncidencia.size() == 1 ) {
                    DescripcionIncidencia descripcion = descripcionIncidencia.get(0);
                    descripcion.setIncidencia(null);
                    i.setDescripcionIncidencia(descripcion);
                }
                i.setHistorialIncidencia(historialIncidencia1);
            });
            return ResponseEntity.ok(incidencia);
        }
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
        return "incidencia_" + idIncidencia + "." + extension;
    }


    @PostMapping(value = "/usuariocomun", consumes = {"multipart/form-data"})
    @ResponseBody
    public ResponseEntity createusuario(@ModelAttribute("incidencia") Incidencia incidencia, @RequestParam(value = "archivo", required = false) MultipartFile archivo) throws Exception {
        Persona persona = incidencia.getPersona();
        HistorialPersona historialPersona = historialPersonaService.findByPersonaAndActivo(persona,'S').get();
        HistorialIncidencia historialIncidencia = new HistorialIncidencia();
        historialIncidencia.setPersona_asignado(incidencia.getHistorialIncidencia().get(0).getPersona_asignado());
        historialIncidencia.setPersona_registro(incidencia.getHistorialIncidencia().get(0).getPersona_registro());
        historialIncidencia.setPersona_notifica(incidencia.getHistorialIncidencia().get(0).getPersona_notifica());
        incidencia.setOficina(historialPersona.getOficina());
        historialIncidencia.setIp(incidenciaService.getClientIp(request));
        historialIncidencia.setFecha(ZonedDateTime.now());
        List<PersonaOrgano> personaOrgano = personaOrganoService.findByOrgano(historialPersona.getOficina().getOrgano());
        if (historialIncidencia.getPersona_asignado() == null) {
            if (personaOrgano.size() == 0) {
                historialIncidencia.setPersona_asignado(null);
            } else {
                for (PersonaOrgano personaOrgano1 : personaOrgano) {
                    if (estadoTecnicoService.findByPersonaAndActivo(personaOrgano1.getPersona(), 'S').size() == 1) {
                        historialIncidencia.setPersona_asignado(personaOrgano1.getPersona());
                        String correoRemitente = historialIncidencia.getPersona_asignado().getCorreo();
                        if (correoRemitente != null){
                            if(!correoRemitente.isEmpty()) {
                                String regx = "^[A-Za-z0-9+_.-]+@(.+)$";
                                Pattern pattern = Pattern.compile(regx);
                                Matcher matcher = pattern.matcher(correoRemitente);
                                if (!matcher.find()) {
                                    System.out.println("CORREO DEL REMITENTE INVALIDO");
                                } else {
                                    EmailService.sendEmail("NUEVA INCIDENCIA", "NUEVA INCIDENCIA", incidencia.getOrigen().getOrigen(), incidencia.getMotivo().getMotivo(), incidencia.getPersona().getNombre() + " " + incidencia.getPersona().getApellido(),ZonedDateTime.now().format(formatter), correoRemitente);
                                }
                            }else {
                                System.out.println("CORREO DEL REMITENTE VACIO");
                            }
                        } else {
                            System.out.println("CORREO DEL REMITENTE NULO");
                        }
                        estadoTecnicoService.findByPersonaAndActivo(personaOrgano1.getPersona(), 'S').get(0).setActivo('N');
                        break;
                    }
                }
                if (historialIncidencia.getPersona_asignado() == null) {
                    for (EstadoTecnico estadoTecnico : estadoTecnicoService.findByActivo('N')) {
                        for (PersonaOrgano personaOrgano1 : personaOrgano) {
                            if (estadoTecnicoService.findByPersona(personaOrgano1.getPersona()).size() == 1) {
                                estadoTecnico.setActivo('S');
                            }
                        }
                    }
                    for (PersonaOrgano personaOrgano1 : personaOrgano) {
                        if (estadoTecnicoService.findByPersona(personaOrgano1.getPersona()).size() == 1) {
                            historialIncidencia.setPersona_asignado(personaOrgano1.getPersona());
                            String correoRemitente = historialIncidencia.getPersona_asignado().getCorreo();
                            if (correoRemitente != null){
                                if(!correoRemitente.isEmpty()) {
                                    String regx = "^[A-Za-z0-9+_.-]+@(.+)$";
                                    Pattern pattern = Pattern.compile(regx);
                                    Matcher matcher = pattern.matcher(correoRemitente);
                                    if (!matcher.find()) {
                                        System.out.println("CORREO DEL REMITENTE INVALIDO");
                                    } else{
                                        EmailService.sendEmail("NUEVA INCIDENCIA", "NUEVA INCIDENCIA", incidencia.getOrigen().getOrigen(), incidencia.getMotivo().getMotivo(), incidencia.getPersona().getNombre() + " " + incidencia.getPersona().getApellido(), ZonedDateTime.now().format(formatter), correoRemitente);
                                    }
                                }else {
                                    System.out.println("CORREO DEL REMITENTE VACIO");
                                }
                            } else {
                                System.out.println("CORREO DEL REMITENTE NULO");
                            }
                            estadoTecnicoService.findByPersona(personaOrgano1.getPersona()).get(0).setActivo('N');
                            break;
                        }
                    }
                }
            }
        }else {
            String correoRemitente = historialIncidencia.getPersona_asignado().getCorreo();
            if (correoRemitente != null){
                if(!correoRemitente.isEmpty()) {
                    String regx = "^[A-Za-z0-9+_.-]+@(.+)$";
                    Pattern pattern = Pattern.compile(regx);
                    Matcher matcher = pattern.matcher(correoRemitente);
                    if (!matcher.find()) {
                        System.out.println("CORREO DEL REMITENTE INVALIDO");
                    } else{
                        EmailService.sendEmail("NUEVA INCIDENCIA", "NUEVA INCIDENCIA", incidencia.getOrigen().getOrigen(), incidencia.getMotivo().getMotivo(), incidencia.getPersona().getNombre() + " " + incidencia.getPersona().getApellido(), ZonedDateTime.now().format(formatter), correoRemitente);
                    }
                }else {
                    System.out.println("CORREO DEL REMITENTE VACIO");
                }
            } else {
                System.out.println("CORREO DEL REMITENTE NULO");
            }
        }
        historialIncidencia.setEstadoIncidencia('P');
        historialIncidencia.setEstado('A');
        incidencia.setHistorialIncidencia(null);
        incidencia.setDescripcionIncidencia(null);
        incidencia.setFecha(ZonedDateTime.now());
        Incidencia incidencia1 = incidenciaService.create(incidencia);
        historialIncidencia.setIncidencia(incidencia1);
        try {
            if (archivo != null) {
                Ftp archivo_usuario = ftpCredencialesService.findById(1).get();
                String nombreArchivo = GenerarNombre(incidencia1.getIdIncidencia(),archivo.getOriginalFilename());
                LocalDate today = LocalDate.now();
                String carpeta = today.format(DateTimeFormatter.ofPattern("yyyy/MM"));
                SubirArchivo(archivo, nombreArchivo, carpeta, archivo_usuario);
                IncidenciaArchivos incidenciaArchivos = incidenciaArchivosService.create(new IncidenciaArchivos(1, carpeta, nombreArchivo, 'R'));
                incidencia1.setIncidenciaArchivos(incidenciaArchivos);
            }
        }catch (FTPErrors | IOException ftpErrors){
            System.out.println("Error al subir archivo");
        }
        historialIncidenciaService.create(historialIncidencia);
        HistorialIncidencia personaAsignado = historialIncidenciaService.findByIdTecnicoAsignado(incidencia1.getIdIncidencia());
        if (personaAsignado != null){
            String cantidadEspera = incidenciaService.findCountIncidencias(personaAsignado.getPersona_asignado().getIdpersona());
            historialIncidencia.setIncidencia(null);
            return new ResponseEntity<>(cantidadEspera, HttpStatus.OK);
        }
        historialIncidencia.setIncidencia(null);
        return new ResponseEntity<>(incidencia1, HttpStatus.CREATED);
    }

    @PostMapping("/downloadFile")
    public ResponseEntity DescargarArchivo(
            @RequestParam("RUTA") String ruta,
            @RequestParam("ARCHIVO") String archivo,
            @RequestParam("MODULO")Integer modulo) throws InterruptedException {
        File base = new File("C:\\");
        File nuevoDirectorio = new File(base, "TempServiceDesk");
        if(!nuevoDirectorio.exists()){
            nuevoDirectorio.mkdir();
        }
        String local = nuevoDirectorio.getAbsolutePath();
        try{
            Ftp usuarioFtp = ftpCredencialesService.findById(modulo).get();
            ftpService.connectToFTP(usuarioFtp.getIp(), usuarioFtp.getUsuario(), usuarioFtp.getClave());
            ftpService.downloadFileFromFTP(ruta.replace('/','\\')+"\\"+archivo,local+"\\"+archivo);
            ftpService.disconnectFTP();
        }catch (FTPErrors ftpe){
            return ResponseEntity.badRequest().body("Hubo un error al traer el archivo.");
        }
        Thread.sleep(2 * 1000);
        return ResponseEntity.ok().body(archivo);
    }

    //@Value("${directorio.temporal}")
    @GetMapping("/viewFile/{nombre}")
    public ResponseEntity<byte[]> getPDF(@PathVariable("nombre")String nombre) throws IOException {
        String userDirectory = new File("").getAbsolutePath();
        //String base = "E:\temp_suga\2022\09\nombre.pdf";
        int index = nombre.lastIndexOf('.') + 1;
        String extension = nombre.substring(index);
        byte[] contents = Files.readAllBytes(Paths.get(base+nombre));
        HttpHeaders headers = new HttpHeaders();
        switch (extension) {
            case "pdf":
                headers.setContentType(MediaType.APPLICATION_PDF);
                break;
            case "png":
                headers.setContentType(MediaType.IMAGE_PNG);
                break;
            case "jpeg":
                headers.setContentType(MediaType.IMAGE_JPEG);
                break;
            case "docx":
                headers.setContentType(MediaType.TEXT_PLAIN);
                break;
        }
        //headers.setContentDispositionFormData(nombre, nombre);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);
        return response;
    }

    @PutMapping("/asignacion")
    public ResponseEntity<Incidencia> updateAsignacion(@RequestBody Incidencia incidencia){
        HistorialIncidencia historialIncidencia = historialIncidenciaService.findByIncidenciaAndEstado(incidencia , 'A');
        historialIncidencia.setEstado('N');
        historialIncidenciaService.update(historialIncidencia);
        HistorialIncidencia historialIncidencia1 = new HistorialIncidencia();
        historialIncidencia1.setIncidencia(incidencia);
        historialIncidencia1.setFecha(ZonedDateTime.now());
        historialIncidencia1.setEstadoIncidencia('P');
        historialIncidencia1.setEstado('A');
        historialIncidencia1.setPersona_asignado(incidencia.getHistorialIncidencia().get(0).getPersona_asignado());
        historialIncidencia1.setPersona_registro(incidencia.getHistorialIncidencia().get(0).getPersona_registro());
        historialIncidencia1.setPersona_notifica(incidencia.getHistorialIncidencia().get(0).getPersona_notifica());
        historialIncidencia1.setIp(incidenciaService.getClientIp(request));
        historialIncidenciaService.create(historialIncidencia1);
        Persona tecnicoAsignado = personaService.findById(incidencia.getHistorialIncidencia().get(0).getPersona_asignado().getIdpersona()).get();
        Persona usuarioRegistro = personaService.findById(incidencia.getHistorialIncidencia().get(0).getPersona_registro().getIdpersona()).get();
        if (tecnicoAsignado.getCorreo() != null){
            if(!tecnicoAsignado.getCorreo().isEmpty()) {
                String regx = "^[A-Za-z0-9+_.-]+@(.+)$";
                Pattern pattern = Pattern.compile(regx);
                Matcher matcher = pattern.matcher(tecnicoAsignado.getCorreo());
                if (!matcher.find()) {
                    System.out.println("CORREO DEL REMITENTE INVALIDO");
                } else{
                    EmailService.sendEmail("ASIGNANDO LA INCIDENCIA", "INCIDENCIA ASIGNADA", historialIncidencia.getIncidencia().getOrigen().getOrigen(), historialIncidencia.getIncidencia().getMotivo().getMotivo(), usuarioRegistro.getNombre() + " " + usuarioRegistro.getApellido(), historialIncidencia.getIncidencia().getFecha().toLocalDateTime().format(formatter), tecnicoAsignado.getCorreo());
                }
            }else {
                System.out.println("CORREO DEL REMITENTE VACIO");
            }
        } else {
            System.out.println("CORREO DEL REMITENTE NULO");
        }
        return new ResponseEntity<>(incidencia, HttpStatus.OK);
    }

    @PutMapping("/reasignacion")
    public ResponseEntity<Incidencia> updateReAsignacion(@RequestBody Incidencia incidencia){
        HistorialIncidencia historialIncidencia = historialIncidenciaService.findByIncidenciaAndEstado(incidencia , 'A');
        historialIncidencia.setEstado('N');
        historialIncidenciaService.update(historialIncidencia);
        HistorialIncidencia historialIncidencia1 = new HistorialIncidencia();
        historialIncidencia1.setIncidencia(incidencia);
        historialIncidencia1.setFecha(ZonedDateTime.now());
        historialIncidencia1.setEstadoIncidencia('P');
        historialIncidencia1.setEstado('A');
        historialIncidencia1.setPersona_asignado(incidencia.getHistorialIncidencia().get(0).getPersona_asignado());
        historialIncidencia1.setPersona_registro(incidencia.getHistorialIncidencia().get(0).getPersona_registro());
        historialIncidencia1.setPersona_notifica(incidencia.getHistorialIncidencia().get(0).getPersona_notifica());
        historialIncidencia1.setIp(incidenciaService.getClientIp(request));
        historialIncidenciaService.create(historialIncidencia1);
        Persona tecnicoAsignado = personaService.findById(incidencia.getHistorialIncidencia().get(0).getPersona_asignado().getIdpersona()).get();
        Persona usuarioRegistro = personaService.findById(incidencia.getHistorialIncidencia().get(0).getPersona_registro().getIdpersona()).get();
        if (tecnicoAsignado.getCorreo() != null){
            if(!tecnicoAsignado.getCorreo().isEmpty()) {
                String regx = "^[A-Za-z0-9+_.-]+@(.+)$";
                Pattern pattern = Pattern.compile(regx);
                Matcher matcher = pattern.matcher(tecnicoAsignado.getCorreo());
                if (!matcher.find()) {
                    System.out.println("CORREO DEL REMITENTE INVALIDO");
                } else{
                    EmailService.sendEmail("RE-ASIGNANDO LA INCIDENCIA", "INCIDENCIA RE-ASIGNADA", historialIncidencia.getIncidencia().getOrigen().getOrigen(), historialIncidencia.getIncidencia().getMotivo().getMotivo(), usuarioRegistro.getNombre() + " " + usuarioRegistro.getApellido(), historialIncidencia.getIncidencia().getFecha().toLocalDateTime().format(formatter), tecnicoAsignado.getCorreo());
                }
            }else {
                System.out.println("CORREO DEL REMITENTE VACIO");
            }
        } else {
            System.out.println("CORREO DEL REMITENTE NULO");
        }
        return new ResponseEntity<>(incidencia, HttpStatus.OK);
    }

    @PutMapping("/tramite")
    public ResponseEntity<Incidencia> updateStatusIncidencia(@RequestBody Incidencia incidencia) {
        HistorialIncidencia historialIncidencia = historialIncidenciaService.findByIncidenciaAndEstado(incidencia, 'A');
        historialIncidencia.setEstado('N');
        historialIncidenciaService.update(historialIncidencia);
        HistorialIncidencia historialIncidencia1 = new HistorialIncidencia();
        historialIncidencia1.setIncidencia(incidencia);
        historialIncidencia1.setFecha(ZonedDateTime.now());
        historialIncidencia1.setEstadoIncidencia('T');
        historialIncidencia1.setEstado('A');
        historialIncidencia1.setPersona_asignado(incidencia.getHistorialIncidencia().get(0).getPersona_asignado());
        historialIncidencia1.setPersona_registro(incidencia.getHistorialIncidencia().get(0).getPersona_registro());
        historialIncidencia1.setPersona_notifica(incidencia.getHistorialIncidencia().get(0).getPersona_notifica());
        historialIncidencia1.setIp(incidenciaService.getClientIp(request));
        historialIncidenciaService.create(historialIncidencia1);
        Persona tecnicoAsignado = personaService.findById(incidencia.getHistorialIncidencia().get(0).getPersona_asignado().getIdpersona()).get();
        Persona usuarioRegistro = personaService.findById(incidencia.getHistorialIncidencia().get(0).getPersona_registro().getIdpersona()).get();
        if (tecnicoAsignado.getCorreo() != null){
            if(!tecnicoAsignado.getCorreo().isEmpty()) {
                String regx = "^[A-Za-z0-9+_.-]+@(.+)$";
                Pattern pattern = Pattern.compile(regx);
                Matcher matcher = pattern.matcher(tecnicoAsignado.getCorreo());
                if (!matcher.find()) {
                    System.out.println("CORREO DEL REMITENTE INVALIDO");
                } else {
                    EmailService.sendEmail("SE ACTUALIZÓ A TRÁMITE SU INCIDENCIA", "INCIDENCIA ACTUALIZADA", historialIncidencia.getIncidencia().getOrigen().getOrigen(), historialIncidencia.getIncidencia().getMotivo().getMotivo(), usuarioRegistro.getNombre() + " " + usuarioRegistro.getApellido(), historialIncidencia.getIncidencia().getFecha().toLocalDateTime().format(formatter), tecnicoAsignado.getCorreo());
                }
            }else {
                System.out.println("CORREO DEL REMITENTE VACIO");
            }
        } else {
            System.out.println("CORREO DEL REMITENTE NULO");
        }
        return new ResponseEntity<>(incidencia, HttpStatus.OK);
    }

    @PutMapping("/atendido")
    public ResponseEntity<Incidencia> updateStatusIncidenciaAtendido(@RequestBody Incidencia incidencia){
        HistorialIncidencia historialIncidencia = historialIncidenciaService.findByIncidenciaAndEstado(incidencia, 'A');
        historialIncidencia.setEstado('N');
        historialIncidenciaService.update(historialIncidencia);
        HistorialIncidencia historialIncidencia1 = new HistorialIncidencia();
        historialIncidencia1.setIncidencia(incidencia);
        historialIncidencia1.setFecha(ZonedDateTime.now());
        historialIncidencia1.setEstadoIncidencia('A');
        historialIncidencia1.setEstado('A');
        historialIncidencia1.setPersona_asignado(incidencia.getHistorialIncidencia().get(0).getPersona_asignado());
        historialIncidencia1.setPersona_registro(incidencia.getHistorialIncidencia().get(0).getPersona_registro());
        historialIncidencia1.setPersona_notifica(incidencia.getHistorialIncidencia().get(0).getPersona_notifica());
        historialIncidencia1.setIp(incidenciaService.getClientIp(request));
        historialIncidenciaService.create(historialIncidencia1);
        return new ResponseEntity<>(incidencia, HttpStatus.OK);
    }

    @PutMapping("/reset")
    public ResponseEntity<Incidencia> updateStatusIncidenciaReset(@RequestBody Incidencia incidencia){
        DescripcionIncidencia descripcionIncidencia = descripcionIncidenciaService.findByIncidencia(incidencia).get(0);
        descripcionIncidenciaService.delete(descripcionIncidencia.getIdDescripcionIncidencia());
        if(descripcionIncidencia.getIncidenciaArchivos() != null){
            incidenciaArchivosService.delete(descripcionIncidencia.getIncidenciaArchivos().getId());
        }
        HistorialIncidencia historialIncidencia = historialIncidenciaService.findByIncidenciaAndEstado(incidencia, 'A');
        historialIncidencia.setEstado('N');
        historialIncidenciaService.update(historialIncidencia);
        HistorialIncidencia historialIncidencia1 = new HistorialIncidencia();
        historialIncidencia1.setIncidencia(incidencia);
        historialIncidencia1.setFecha(ZonedDateTime.now());
        historialIncidencia1.setEstadoIncidencia('P');
        historialIncidencia1.setEstado('A');
        historialIncidencia1.setPersona_asignado(incidencia.getHistorialIncidencia().get(0).getPersona_asignado());
        historialIncidencia1.setPersona_registro(incidencia.getHistorialIncidencia().get(0).getPersona_registro());
        historialIncidencia1.setPersona_notifica(incidencia.getHistorialIncidencia().get(0).getPersona_notifica());
        historialIncidencia1.setIp(incidenciaService.getClientIp(request));
        historialIncidenciaService.create(historialIncidencia1);
        Persona tecnicoAsignado = personaService.findById(incidencia.getHistorialIncidencia().get(0).getPersona_asignado().getIdpersona()).get();
        Persona usuarioRegistro = personaService.findById(incidencia.getHistorialIncidencia().get(0).getPersona_registro().getIdpersona()).get();
        if (tecnicoAsignado.getCorreo() != null){
            if(!tecnicoAsignado.getCorreo().isEmpty()) {
                String regx = "^[A-Za-z0-9+_.-]+@(.+)$";
                Pattern pattern = Pattern.compile(regx);
                Matcher matcher = pattern.matcher(tecnicoAsignado.getCorreo());
                if (!matcher.find()) {
                    System.out.println("CORREO DEL REMITENTE INVALIDO");
                }else{
                    EmailService.sendEmail("HA SIDO RESETEADA EL ESTADO DE LA INCIDENCIA", "INCIDENCIA RESETEADA", historialIncidencia.getIncidencia().getOrigen().getOrigen(), historialIncidencia.getIncidencia().getMotivo().getMotivo(), usuarioRegistro.getNombre() + " " + usuarioRegistro.getApellido(),  historialIncidencia.getIncidencia().getFecha().toLocalDateTime().format(formatter), tecnicoAsignado.getCorreo());
                }
            }else {
                System.out.println("CORREO DEL REMITENTE VACIO");
            }
        } else {
            System.out.println("CORREO DEL REMITENTE NULO");
        }
        return new ResponseEntity<>(incidencia, HttpStatus.OK);
    }

}
