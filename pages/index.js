import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [nameInput, setNameInput] = useState("");
  const [prevName, setPrevName] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nameInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setPrevName(nameInput);
      setLoading(false);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  function cleanName(name) {
    return name.trim().split(/\s+/).map(s => s[0].toUpperCase() + s.slice(1).toLowerCase()).join(' ');
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
        <div className={styles.result}>{loading ? "Generating..." :
          result ?? ""}</div>
      </main>
    </div>
  );
}
