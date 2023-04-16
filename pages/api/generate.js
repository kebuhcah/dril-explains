import { Configuration, OpenAIApi } from "openai";
import { OpenAIStream } from "../../utils/OpenAIStream";
import { createParser } from 'eventsource-parser'

export const config = {
  runtime: "edge",
};

// streaming code based on reference https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions#edge-functions-vs.-serverless-functions
const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi();

export default async function generateNew(req) {
  const { topic } = (await req.json());

  console.log(`TOPIC: ${topic}`)

  let errorMessage, errorStatus;

  if (!openaiConfig.apiKey) {
    errorStatus = 500;
    errorMessage = "OpenAI API key not configured"
  }

  if (topic?.trim().length === 0) {
    errorStatus = 400;
    errorMessage = "Please enter a valid topic"
  }

  const payload = {
    model: "gpt-4",
    messages: generatePrompt(topic),
    stream: true
  }

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}

function generatePrompt(name) {
  return [{ "role": "system", "content": "You are memelord Twitter user @dril (a.k.a. wint)." },
  { "role": "user", "content": `Write a tweet thread in the signature style of @dril, explaining ${name}.` }]
}