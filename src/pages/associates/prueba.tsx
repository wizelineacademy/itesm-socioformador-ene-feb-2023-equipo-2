import React, { useState, useEffect } from "react";
import { useHasMounted } from "@/components/useHasMounted";

const prueba = async () => {
  const hasMounted = useHasMounted();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { Configuration, OpenAIApi } = require("openai");
      const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);
      try {
        const result = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: "Say this is a test",
          temperature: 0,
          max_tokens: 7,
        });
        setResponse(result);
      } catch (error) {
        console.log(error);
        setResponse(null); // reset response to null in case of error
      }
    };
    fetchData();
  }, [])
  
  console.log(response)

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div>fdsfdsfdsfsds</div>
    </>
  );
};

export default prueba;
