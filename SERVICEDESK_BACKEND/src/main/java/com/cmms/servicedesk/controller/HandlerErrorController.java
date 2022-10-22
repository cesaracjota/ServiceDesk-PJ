package com.cmms.servicedesk.controller;

import com.cmms.servicedesk.ServiceDeskApplication;
import com.cmms.servicedesk.exception.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpMessage;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class HandlerErrorController implements ErrorController {

    private static final Logger logger = LoggerFactory.getLogger(ServiceDeskApplication.class);

    public String getErrorPath(){
        return "/error";
    }

    @RequestMapping(path = "/error")
    public void globalError(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);

        if (status != null) {
            Integer statusCode = Integer.valueOf(status.toString());

            if(statusCode == HttpStatus.NOT_FOUND.value()) {
                throw new UserNotFoundException("Mensaje prueba 404");
            }
            else if(statusCode == HttpStatus.UNAUTHORIZED.value()) {
                throw new UserNotFoundException("NO AUTORIZADO");
            }
            else if(statusCode == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
                throw new ResponseStatusException(HttpStatus.valueOf(response.getStatus()));
            }
        }

        throw new Exception("Error");
    }
}
