package com.example.chatserver.controller;

import com.example.chatserver.model.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    SimpMessagingTemplate template;

    @PostMapping("/send")
    public ResponseEntity<Void> sendMessage(@RequestBody Message message) {
        template.convertAndSend("/topic/public", message);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @MessageMapping("/chat")
    @SendTo("/topic/public")
    public Message broadcastMessage(@Payload Message message) {
        return message;
    }
}
