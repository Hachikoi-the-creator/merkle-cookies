import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { getDataToSend } from "~/utils/getData";
import goodPaisenArr from "~/data/goodNames.json";
import styles from "~/styles/Root.module.css";
// * Fireworks kill my pc :c
// import { FireworksComp } from "./components/Fireworks";
// import type { FireworksHandlers } from "@fireworks-js/react";

export default function Root() {
  const nameRef = useRef<HTMLInputElement>(null);
  const [goodPaisen, setGoodPaisen] = useState("");
  const [showCookie, setShowCookie] = useState(false);
  // const fireworkRef = useRef<FireworksHandlers>(null);

  // const toggle = () => {
  //   if (!fireworkRef.current) return;
  //   if (fireworkRef.current.isRunning) {
  //     fireworkRef.current.stop();
  //   } else {
  //     fireworkRef.current.start();
  //   }
  // };

  // paisen nickname for senpai
  const checkIfGoodPaisen = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const send = getDataToSend(nameRef.current?.value || "no-name");
    axios
      .post("/api/gift", send)
      .then((res) => {
        console.log(res.data);
        window.alert("You deserve a cookie!");
      })
      .catch((e) => {
        console.error(e);
        window.alert(
          "You cannot have cookie :C \nif you think this is an error add yourself to the good list! @ https://github.com/Hachikoi-the-creator/merkle-cookies  "
        );
      });
  };

  const getRandomGoodPaisen = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rndIndex = Math.floor(Math.random() * goodPaisenArr.length);
    setGoodPaisen(goodPaisenArr[rndIndex]);
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.innerWrapper}>
          <h1 className={styles.title}>Have you been good?~</h1>
          <form className="formContainer" onSubmit={checkIfGoodPaisen}>
            <label className={styles.label}>
              Enter your name
              <input
                type="text"
                ref={nameRef}
                name="name"
                className={styles.input}
                placeholder="your name here~"
              />
            </label>
            <button className={styles.button}>Check yourself</button>
          </form>

          <div className={styles.exampleContainer}>
            <h4 className={styles.subtitle}>Random Good Person</h4>
            <form onSubmit={getRandomGoodPaisen}>
              <button className={styles.button}>Show</button>
            </form>
            <p className={styles.result}>{goodPaisen}</p>
          </div>
        </div>
        {/* <FireworksComp {...{ toggle, fireworkRef }} />, */}
      </main>
    </>
  );
}
