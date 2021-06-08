package com.example.chatserver.controller;

import java.util.Set;

import com.example.chatserver.dto.ContactBody;
import com.example.chatserver.model.Message;
import com.example.chatserver.model.Contact;
import com.example.chatserver.service.ContactsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private ContactsService contactsService;

    @PostMapping("/connect")
    public ResponseEntity<Void> connect(@RequestBody ContactBody contact){
        try {
            Set<Contact> contacts = this.contactsService.addContactChatList(contact.getName());
            this.template.convertAndSend("/topic/contacts", contacts);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/disconnect") 
    public ResponseEntity<Void> disconnect(@RequestBody ContactBody contact){
        try {
            Set<Contact> contacts = this.contactsService.updateStatusContactChat(contact.getName());
            this.template.convertAndSend("/topic/contacts", contacts);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/send")
    public ResponseEntity<Void> sendMessage(@RequestBody Message message) {
        template.convertAndSend("/topic/public", message);
        return ResponseEntity.ok().build();
    }

    @MessageMapping("/chat")
    @SendTo("/topic/public")
    public Message broadcastMessage(@Payload Message message) {
        return message;
    }

    @SendTo("/topic/contacts")
    public Set<Contact> broadcasContacts(@Payload Set<Contact> contact) {
        return contact;
    }
}
