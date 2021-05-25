import chatServer from "../../../services/chat-server";

export const ResponseSendMessage = {
    SENDED: 200,
    ERRO: 400,
}

export async function sendMessage(msg) {
    try {
        const response = await chatServer.post("/send", {
            ...msg
        });
        return response.status === ResponseSendMessage.SENDED ? ResponseSendMessage.SENDED : ResponseSendMessage.ERRO;
    } catch {
        return ResponseSendMessage.ERRO;
    }
}