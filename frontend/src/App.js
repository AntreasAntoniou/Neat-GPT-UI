import React, { useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import styled from "@emotion/styled";

const ContainerStyle = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const TextFieldStyle = styled(TextField)`
  margin-bottom: 1rem;
  width: 100%;
`;

const ResponseAreaStyle = styled("div")`
  white-space: pre-wrap;
  margin-top: 1rem;
`;

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/gpt4/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ContainerStyle maxWidth="md">
      <Typography variant="h4" component="h1">
        NeatGPTUI
      </Typography>
      <TextFieldStyle
        label="Enter your prompt"
        multiline
        rows={4}
        variant="outlined"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <ResponseAreaStyle>{response}</ResponseAreaStyle>
    </ ContainerStyle>
  );
}

export default App;
