package com.example.chatserver.controller;

import com.example.chatserver.model.Message;

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
public class ChatController<Contact> {

    @Autowired
    SimpMessagingTemplate template;

    @PostMapping("/connect")
    public ResponseEntity<Void> connect(@RequestBody Contact contact){
        return updateContacts(contact);
    }

    @PostMapping("/disconnect") 
    public ResponseEntity<Void> disconnect(@RequestBody Contact contact){
        return updateContacts(contact);
    }

    public ResponseEntity<Void> updateContacts(Contact contact){
        template.convertAndSend("/topic/contacts", contact);
        return ResponseEntity.ok().build();
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
    public Contact broadcasContacts(@Payload Contact contact) {
        return contact;
    }
}
