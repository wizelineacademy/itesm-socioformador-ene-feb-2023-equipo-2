import fs from 'fs';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const OPENAI_API_URL = 'https://api.openai.com/v1/api-keys';
const API_KEYS_FILE = 'apiKeys.txt';
const MAX_RETRIES = 3;

async function getOrCreateAPIKey(): Promise<string[]> {
    const apiKey = process.env.OPENAI_API_KEY;
    const secretKey = process.env.OPENAI_SECRET_KEY;
    if (apiKey && secretKey) {
        console.log(apiKey + "has " + secretKey)
        return [apiKey, secretKey];
        
    }

    let apiKeys: string[] = [];
  
    try {
      const data = fs.readFileSync(API_KEYS_FILE, "utf8");
      apiKeys = data.split("\n").filter(Boolean);
    } catch (err) {
      console.error(`Failed to read API keys from file: ${err.message}`);
    }
  
    if (apiKeys.length === 0) {
      console.log("No API keys found. Creating a new one...");
      try {
        const response = await axios.post(
          OPENAI_API_URL,
          {
            name: `API key ${uuidv4()}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENAI_SECRET_KEY}`,
            },
          },
        );
        const newApiKey = response.data.secret.key;
        const newSecretKey = response.data.secret.secret;
        apiKeys.push(newApiKey, newSecretKey);
        fs.writeFileSync(API_KEYS_FILE, apiKeys.join('\n'));
      } catch (error) {
        console.error(`Failed to create API key: ${error.message}`);
      }
    }
  
    return apiKeys;
  }

  export default getOrCreateAPIKey;