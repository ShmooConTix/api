import { openai } from "./openai.ts";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { solveRiddlePrompt } from "./prompts.ts";

interface RiddleRequest {
  riddle: string;
}

interface RiddleResponse {
  answer: string;
}

const RiddleAnswer = z.object({
  answer: z.string(),
});

const completionPromise: {
  startedAt: Date | null;
  promise: Promise<any> | null;
} = {
  startedAt: null,
  promise: null,
};

export async function solveRiddle({
  body,
}: {
  body: RiddleRequest;
}): Promise<RiddleResponse> {
  const { riddle } = body;

  if (riddle.length === 0) return { answer: "UNKNOWN" };

  if (completionPromise.startedAt === null || completionPromise.startedAt?.getTime() < Date.now() - 1000 * 60) { 
    completionPromise.promise = openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: solveRiddlePrompt,
        },
        {
          role: "user",
          content: riddle,
        },
      ],
      response_format: zodResponseFormat(RiddleAnswer, "riddle_answer"),
    });

    completionPromise.startedAt = new Date();
  }

  const completion = await completionPromise.promise;

  return {
    answer: completion.choices[0].message.parsed?.answer ?? "UNKNOWN",
  };
}
