import { 
    Content, 
    Memory, 
    IAgentRuntime, 
    stringToUuid,
    getEmbeddingZeroVector,
    composeContext,
    parseJSONObjectFromText,
    ModelClass,
    elizaLogger,
    generateText
} from "@elizaos/core";

import { popupMessageHandlerTemplate } from "./templates";

export class PopupMessageManager {
    private runtime: IAgentRuntime;

    constructor(runtime: IAgentRuntime) {
        this.runtime = runtime;
    }

    async handleMessage(message: { text: string, roomId: string, userId: string }) {
        
        try {
            elizaLogger.info("Handling message:", message);
            const roomId = stringToUuid(message.roomId);
            const userId = stringToUuid(message.userId);

            const messageId = stringToUuid(Date.now().toString());
            
            await this.runtime.ensureConnection(
                userId,
                roomId,
                "browser"
            );

            const content: Content = {
                text: message.text,
                attachments: [],
                source: "browser",
                inReplyTo: undefined,
            };

            const userMessage = {
                content,
                userId,
                roomId,
                agentId: this.runtime.agentId,
            };

            // Create memory object for user message
            const memory: Memory = {
                id: messageId,
                agentId: this.runtime.agentId,
                userId,
                roomId,
                content,
                createdAt: Date.now(),
            };
            
            // Store the user message
            await this.runtime.messageManager.createMemory(memory);

            // Get state and check if we should respond
            const state = await this.runtime.composeState(userMessage, {
                agentName: this.runtime.character.name,
            });

            // Generate response context
            const responseContext = composeContext({ 
                state,
                template: popupMessageHandlerTemplate
            });

            // Generate response
            const response = await this._generateResponse(responseContext);
            
            // Store response as memory with type
            if (response) {
                const responseMemory: Memory = {
                    id: stringToUuid(Date.now().toString()),
                    content: response,
                    userId: this.runtime.agentId,
                    agentId: this.runtime.agentId,
                    roomId,
                    embedding: getEmbeddingZeroVector(),
                    createdAt: Date.now()
                };
                await this.runtime.messageManager.createMemory(responseMemory);
            }

            return response as Content;

        } catch (error) {
            elizaLogger.error("Error handling message:", error);
            throw error;
        } 
    }

    private async _generateResponse(
        context: string
    ) {

        const response = await generateText({
            runtime: this.runtime,
            context: context,
            modelClass: ModelClass.LARGE,
        });

        const parsedContent = parseJSONObjectFromText(response) as Content;
        if (!parsedContent) {
            elizaLogger.debug("Creating Content object from raw text");
            return {
                text: response,
                attachments: [],
                source: "browser",
                inReplyTo: undefined
            } as Content;
        }

        return parsedContent as Content;
    }
}