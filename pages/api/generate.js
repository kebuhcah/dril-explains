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


  export async function generate(req, res) {
    if (!openaiConfig.apiKey) {
      res.status(500).json({
        error: {
          message: "OpenAI API key not configured, please follow instructions in README.md",
        }
      });
      return;
    }

    const name = req.query.name || '';
    if (name.trim().length === 0) {
      res.status(400).json({
        error: {
          message: "Please enter a valid name",
        }
      });
      return;
    }

    try {

      let response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
          },
          method: "POST",
          body: JSON.stringify({
            model: "gpt-4",
            messages: generatePrompt(name),
            temperature: 0.75,
            stream: true
          }),
        }
      );

      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-transform, no-cache',
        'Connection': 'keep-alive'
      });

      const parser = createParser((event) => {
        if (event.type === 'event') {
          if (event.data !== "[DONE]") {
            const content = JSON.parse(event.data).choices[0].delta?.content || "";

            const message = `data: ${JSON.stringify({ token: content })}\n\n`;
            console.log(message);
            res.write(`event: message\ndata: ${JSON.stringify({ token: content })}\n\n`);
          } else {
            res.end();
          }
        } else if (event.type === 'reconnect-interval') {
          console.log('We should set reconnect interval to %d milliseconds', event.value)
        }
      })

      for await (const value of response.body?.pipeThrough(new TextDecoderStream())) {
        console.log("Received", value);
        parser.feed(value)
      }

      res.write(`data: [DONE]`);
      //res.status(200).json({ result: completion.data.choices[0].message.content });
    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
          error: {
            message: 'An error occurred during your request.',
          }
        });
      }
    }
  }

  function generatePrompt(name) {
    return [{ "role": "system", "content": "You are memelord Twitter user @dril (a.k.a. wint)." },
    { "role": "user", "content": `Write a tweet in the signature style of @dril, explaining ${name}.` }]
  }