import { OpenAIApi, Configuration } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  })
);

export const getChatResponse = async (messages: any) => {
  const response : any = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  return response.data.choices[0].message.content;
};