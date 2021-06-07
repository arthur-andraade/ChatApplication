package com.example.chatserver.model;

public class Contact {
    private String name;
    private Status status;

    public enum Status {
        ONLINE("on"), 
        OFFLINE("off");

        public String status;

        Status(String status){
            this.status = status;
        }
    }

    public String getName() {
        return name;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public void setName(String name) {
        this.name = name;
    }
}
