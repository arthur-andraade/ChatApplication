package com.example.chatserver.service;

import java.util.Set;

import com.example.chatserver.model.Contact;
import com.example.chatserver.storage.ContactsStorage;


public class ContactsService {

    public Set<Contact> addContactChatList(String contact) throws Exception {
        try {
            return ContactsStorage.getInstance().saveContact(contact);
        } catch (Exception e) {
            throw new Exception();
        }
    }

    public Set<Contact> updateStatusContactChat(String contact) throws Exception {
        try {
            return ContactsStorage.getInstance().updateContact(contact);
        } catch (Exception e) {
            throw new Exception();
        }
    }
}
