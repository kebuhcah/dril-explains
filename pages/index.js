import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [nameInput, setNameInput] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [eventCounter, setEventCounter] = useState(0);
  const [result, setResult] = useState("Ask about anything! (put it as a noun phrase for best results)");

  const outputRef = useRef(null);

  /*useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    outputRef.current?.scrollIntoView(false, {behavior: 'smooth'});
  }, [result]);*/



  async function onSubmit(event) {
    event.preventDefault();

    console.log(nameInput);

    if (!nameInput) return;
    setResult("");

    try {
      setSubmittedName(nameInput);
      setEventCounter(x => x + 1);

      const response = await fetch(`/api/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: nameInput,
          })
        });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = response.body;
      if (!data) {
        return;
      }
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setResult((prev) => prev + chunkValue);
        outputRef.current?.scrollIntoView(false, { behavior: 'smooth' });
      }
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>dril explains 😎</title>
      </Head>

      <main className={styles.main}>
        <h3>#drilexplains</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="target"
            placeholder="Enter a topic"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <input type="submit" value="Ask Dril" />
        </form>
        <div className={styles.result}>
          <div ref={outputRef} className={styles.scroller}>{result.length ? result : "Loading..."}</div>
        </div>
      </main>
    </div>
  );
}
