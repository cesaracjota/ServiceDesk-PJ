package com.cmms.servicedesk.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
@RestController
@RequestMapping("/api")
public class ConsultaAPIController {
    @GetMapping("/frasedia")
    @CrossOrigin(origins = "*")
    public String getFraseAPI() {
        String url = "https://frasedeldia.azurewebsites.net/api/phrase";
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        return result;
    }
}
