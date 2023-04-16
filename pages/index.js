import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [nameInput, setNameInput] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [eventCounter, setEventCounter] = useState(0);
  const [result, setResult] = useState();

  useEffect(() => {
    if (submittedName === "")
      return;

    setResult("");

    const eventSource = new EventSource(`/api/generate?name=${encodeURIComponent(submittedName)}`);

    eventSource.onerror = (e) => {
      console.error(e);
      eventSource.close();
    }

    eventSource.onmessage = (e) => {
      console.log(e);
      setResult((r) => { return r + JSON.parse(e.data).token ?? "" });
    };

    return () => {
      console.log('UNMOUNTED');
      eventSource.close();
    }
  }, [submittedName, eventCounter])

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setSubmittedName(nameInput);
      setEventCounter(x => x + 1);
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
        <div className={styles.result}>{result ?? ""}</div>
      </main>
    </div>
  );
}
