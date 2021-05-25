package com.example.chatserver.controller;

import com.example.chatserver.model.Message;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
        
    @MessageMapping("/chat")
    @SendTo("/topic/public")
    public Message sendMessage(@Payload Message message){
        return message;
    }
}
