import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_SECRET_KEY = process.env.OPENAI_API_SECRET_KEY;

async function deleteKey(key: string): Promise<boolean> {
  const url = `https://api.openai.com/v1/api_keys/${key}`;

  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${OPENAI_API_SECRET_KEY}`,
      },
    });
    console.log(`API key ${key} deleted.`);
    return true;
  } catch (error) {
    console.error(`Failed to delete API key ${key}.`, error);
    return false;
  }
}

export default deleteKey;