package com.example.chatserver.service;

import java.util.List;
import java.util.stream.Collectors;

import com.example.chatserver.model.Contact;
import com.example.chatserver.storage.ContactsStorage;

import org.springframework.stereotype.Service;

@Service
public class ContactsService {

    public void addContactChatList(String contact) throws Exception {
        try {
            List<Contact> contacts = ContactsStorage.getInstance().getContacts();
            contacts.add(new Contact(contact, Contact.Status.ONLINE));
            ContactsStorage.getInstance().setContacts(contacts);
        } catch (Exception e) {
            throw new Exception();
        }
    }

    public void updateStatusContactChat(String contact) throws Exception {
        try {
            List<Contact> contacts = ContactsStorage.getInstance().getContacts()
                .stream()
                .filter(x -> !x.getName().equals(contact))
                .collect(Collectors.toList());
            contacts.add(new Contact(contact, Contact.Status.OFFLINE));
            ContactsStorage.getInstance().setContacts(contacts);
        } catch (Exception e) {
            throw new Exception();
        }
    }
}
