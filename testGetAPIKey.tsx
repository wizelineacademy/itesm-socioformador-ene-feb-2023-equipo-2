import dotenv from "dotenv";
import openai from "openai";
import fs from "fs"
import getOrCreateAPIKey from './testGetOrCreateAPIKey';
import deleteKey from './testDeleteKey';

dotenv.config();

let OPENAI_API_KEYS: string[] = [];

async function generateText(prompt: string, length: number): Promise<string> {  
  if (OPENAI_API_KEYS.length === 0) {
    console.log("No API keys found. Reading from file...");
    OPENAI_API_KEYS = await getOrCreateAPIKey();
    if (OPENAI_API_KEYS.length === 0) {
      console.log("Failed to read or create API keys. Aborting...");
      return "";
    }
  }    

  for (let i = 0; i < OPENAI_API_KEYS.length; i++) {
    const apiKey = OPENAI_API_KEYS[i];
    try {
      const gptResponse = await openai.Completion.create(
        {
          engine: "davinci",
          prompt: prompt,
          max_tokens: length,
          n: 1,
          temperature: 0.7,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        apiKey,
      );

      const { choices } = gptResponse.data;
      const [{ text }] = choices;
      return text;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(`API key ${apiKey} failed authentication. Trying the next one...`);
      } else {
        console.log(`Failed to generate text with API key ${apiKey}. Trying the next one...`);
      }

      if (error.response && error.response.status === 403) {
        console.log(`API key ${apiKey} has been deleted. Removing from list...`);
        await deleteKey(apiKey);
        OPENAI_API_KEYS.splice(i, 1);
        i--;
      }
    }

    fs.writeFileSync('.env.local', `OPENAI_API_KEY=${apiKey}\nDATABASE_URL="postgresql://postgres:drey-use23afa@postgreswizeline.chxspwlgu0b5.us-east-2.rds.amazonaws.com:5432/wizeline_dev"`, { flag: 'w' });
    if (err) {
        console.error(err);
      }
      console.log("Environment variables updated successfully.");
  }

  console.log("All API keys failed authentication. Creating a new one...");
  const newApiKeys = await getOrCreateAPIKey();
  if (newApiKeys.length > 0) {
    console.log(`New API keys created: ${newApiKeys.join(", ")}`);
    OPENAI_API_KEYS = newApiKeys;
    return generateText(prompt, length);
  } else {
    console.log("Failed to create a new OpenAI API key. Aborting...");
    return "";
  }
}

async function main() {
  const text = await generateText("Hello, world!", 10);
  console.log(text);
}

main();