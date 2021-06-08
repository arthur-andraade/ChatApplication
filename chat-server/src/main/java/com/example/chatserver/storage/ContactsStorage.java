package com.example.chatserver.storage;

import java.util.ArrayList;
import java.util.List;

import com.example.chatserver.model.Contact;

public class ContactsStorage {
    private static ContactsStorage instance;
    private List<Contact> contacts;

    ContactsStorage() {
        contacts = new ArrayList<Contact>();
    }

    public static synchronized ContactsStorage getInstance() {
        if (instance == null) {
            instance = new ContactsStorage();
        }
        return instance;
    }

    public List<Contact> getContacts(){
        return contacts;
    }

    public void setContacts(List<Contact> newContacts){
        contacts = newContacts;
    }
}
