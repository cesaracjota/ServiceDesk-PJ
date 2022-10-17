package com.cmms.servicedesk.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Usuario no encontrado")
public class UserNotFoundException extends Exception{
    public UserNotFoundException(String errorMessage){
        super(errorMessage);
    }
}
