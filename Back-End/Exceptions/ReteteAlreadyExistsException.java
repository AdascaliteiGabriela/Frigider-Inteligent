package com.example.blue_app.Exceptions;

public class ReteteAlreadyExistsException extends RuntimeException{

    public ReteteAlreadyExistsException(String mess) {
        super(mess);
    }
}
