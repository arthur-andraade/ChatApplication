package com.example.chatserver.service;

import java.util.Set;

import com.example.chatserver.model.Contact;
import com.example.chatserver.storage.ContactsStorage;

import org.springframework.beans.factory.annotation.Autowired;

public class ContactsService {

    @Autowired
    private ContactsStorage storage;

    public Set<Contact> addContactChatList(String contact) throws Exception {
        try {
            return this.storage.saveContact(contact);
        } catch (Exception e) {
            throw new Exception();
        }
    }

    public Set<Contact> updateStatusContactChat(String contact) throws Exception{
        try {
            return this.storage.updateContact(contact);
        } catch (Exception e) {
            throw new Exception();
        }
    }
}
