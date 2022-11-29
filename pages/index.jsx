import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [promptInput, setPromptInput] = useState();
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    const response = await fetch('/api/generateText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promptInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  return (
    <div className={styles.container}>
      <div className={styles.headings}>
        <h1>Clear your Viking Doubts</h1>
        <p></p>
      </div>
      <textarea
        value={promptInput}
        className={styles.promptInput}
        type="text"
        placeholder="Type in your question..."
        onChange={(e) => {
          setPromptInput(e.target.value);
        }}
      />
      <button className={styles.generateBtn} onClick={callGenerateEndpoint}>
       {isGenerating ? "Getting the facts..." : "Get the answer"}
      </button>
      <div className={styles.outputDiv}>
        <h2>Output</h2>
        <p>{apiOutput ? apiOutput : ""}</p>
      </div>
    </div>
  );
}
