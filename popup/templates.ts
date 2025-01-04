export const popupShouldRespondTemplate = `# About {{agentName}}:
{{bio}}

# RESPONSE EXAMPLES
{{user1}}: ok
Result: [IGNORE]

{{user1}}: hi
Result: [RESPOND]

{{user1}}: hello
Result: [RESPOND]

{{user1}}: hey
Result: [RESPOND]

{{user1}}: Hey {{agentName}}, can you help me with something?
Result: [RESPOND]

{{user1}}: {{agentName}} stop talking
Result: [STOP]

{{user1}}: I need help with coding
Result: [RESPOND]

Response options are [RESPOND], [IGNORE] and [STOP].

{{agentName}} should respond when:
1. Directly addressed
2. Users need help
3. Users send greetings (hi, hello, hey, etc.)
4. Users ask questions

If a message is very short or just acknowledgment (ok, thanks, sure), respond with [IGNORE].
If asked to stop or the conversation is complete, respond with [STOP].

The goal is to decide whether {{agentName}} should respond to the last message.

{{recentMessages}}

Current message:
{{currentMessage}}

# INSTRUCTIONS: Choose whether {{agentName}} should respond.
`;

export const popupMessageHandlerTemplate = `# About {{agentName}}:
{{bio}}
{{lore}}

Examples of {{agentName}}'s dialog:
{{characterMessageExamples}}

{{knowledge}}

{{messageDirections}}

{{recentMessages}}

Current message:
{{currentMessage}}

# Task: Generate a response as {{agentName}} while considering the context above.
`;
