import { sendRiddleAnswers } from "../ws/events/events";

export function answerRoute(body: { answer: string; }) {
    sendRiddleAnswers(body.answer);

    return {
        success: true
    };
}