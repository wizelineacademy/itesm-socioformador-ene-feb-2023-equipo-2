import React, { useState, useEffect } from "react";
import { getChatResponse } from "@/openai/openai";
import { useHasMounted } from "@/components/useHasMounted";

const prueba = () => {
  const hasMounted = useHasMounted();
  const [texto, setTexto] = useState("");
  const [response, setResponse] = useState(null);

  const handleClick = (texto : any) => {
    const messages = [{ role: "user", content: texto }];
    getChatResponse(messages).then((res) => {
      console.log(res);
      setResponse(res);
    });
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <input
        onChange={e => setTexto(e.target.value)}
      />
      <button onClick={() => handleClick(texto)}>boton</button>
      <p>{response}</p>
    </>
  );
};

export default prueba;
