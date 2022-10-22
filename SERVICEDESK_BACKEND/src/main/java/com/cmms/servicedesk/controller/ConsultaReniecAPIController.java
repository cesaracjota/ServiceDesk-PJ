package com.cmms.servicedesk.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
@RestController
@RequestMapping("/api")
public class ConsultaReniecAPIController {

    @GetMapping("/reniec/{dni}")
    @CrossOrigin(origins = "*")
    public List<Object> getApiReniec(@PathVariable("dni") String dni) {
        String url = "http://172.28.206.57:8080/SIJ/Reniec/" + dni;
        String requestJson = "{\"queriedQuestion\":\"Is there pain in your hand?\"}";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<String>(requestJson, headers);
        RestTemplate restTemplate = new RestTemplate();
        Object[] result = restTemplate.postForObject(url, request, Object[].class);
        return Arrays.asList(result);
    }
}
