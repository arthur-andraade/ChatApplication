package com.example.chatserver.storage;

import java.util.HashSet;
import java.util.Set;

import com.example.chatserver.model.Contact;


public class ContactsStorage {
    private Set<Contact> contacts;

    ContactsStorage() {
        this.contacts = new HashSet<Contact>();
    }

    public Set<Contact> saveContact(String contact)
            throws UnsupportedOperationException, ClassCastException, NullPointerException, IllegalArgumentException {
        this.contacts.add(new Contact(contact, Contact.Status.ONLINE));
        return this.contacts;
    }

    public Set<Contact> updateContact(String contact) throws Exception{
        Contact contactToUpdate = new Contact(contact, Contact.Status.ONLINE);
        if(this.contacts.contains(contactToUpdate)){
            this.contacts.remove(contactToUpdate);
            this.contacts.add(new Contact(contactToUpdate.getName(), Contact.Status.OFFLINE));
            return this.contacts;
        }else{
            throw new Exception();
        }
    }
}
