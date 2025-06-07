"use client";

import { useEffect, useState } from "react";

import styles from "./style.module.css";

type CopyButtonText = "복사하기" | "복사됨" | "오류";

export default function SafePasswordGen() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(12);
  const [english, setEnglish] = useState<boolean>(true);
  const [numbers, setNumbers] = useState<boolean>(true);
  const [mixCase, setMixCase] = useState<boolean>(true);
  const [special, setSpecial] = useState<boolean>(true);
  const [copyButtonText, setCopyButtonText] = useState<CopyButtonText>("복사하기");

  function generateAndShowPassword() {
    const newPassword = generatePassword({ length, english, numbers, mixCase, special });
    setPassword(newPassword);
    setCopyButtonText("복사하기");
  }

  async function handleCopyButton() {
    try {
      await navigator.clipboard.writeText(password);
      setCopyButtonText("복사됨");
    } catch {
      setCopyButtonText("오류");
    }
  }

  useEffect(generateAndShowPassword, [length, english, numbers, mixCase, special]);

  return (
    <>
      <section>
        <input type="text" readOnly value={password} className={styles.monospace} />
        <div className="grid">
          <button onClick={generateAndShowPassword}>새로고침</button>
          <button onClick={handleCopyButton}>{copyButtonText}</button>
        </div>
      </section>
      <fieldset>
        <label>
          길이: {length}자
          <input
            type="range"
            min={4}
            max={64}
            step={1}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={english}
            onChange={(e) => {
              if (!e.target.checked && !numbers) {
                setNumbers(true);
              }
              setEnglish(e.target.checked);
            }}
          />
          영어
        </label>
        <label>
          <input
            type="checkbox"
            checked={numbers}
            onChange={(e) => {
              if (!e.target.checked && !english) {
                setEnglish(true);
              }
              setNumbers(e.target.checked);
            }}
          />
          숫자
        </label>
        <label>
          <input type="checkbox" checked={mixCase} onChange={(e) => setMixCase(e.target.checked)} disabled={!english} />
          대소문자 섞기
        </label>
        <label>
          <input type="checkbox" checked={special} onChange={(e) => setSpecial(e.target.checked)} disabled={!english} />
          특수문자
        </label>
      </fieldset>
    </>
  );
}

function getMaterialChars({
  english,
  numbers,
  mixCase,
  special,
}: {
  english: boolean;
  numbers: boolean;
  mixCase: boolean;
  special: boolean;
}): string {
  let materialChars = "";
  if (english) {
    // 52 chars
    if (mixCase) {
      materialChars += "abcdefghijklmnopqrstuvwxyz";
      materialChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    } else {
      materialChars += "abcdefghijklmnopqrstuvwxyz".repeat(2);
    }
    if (special) {
      // 22 chars
      materialChars += "!@#$&*-+=~?".repeat(2);
    }
  }
  if (numbers) {
    // 30 chars
    materialChars += "012345689".repeat(3);
  }
  return materialChars;
}

function pickOneCharExcept(materialChars: string, exceptChar: string | undefined): string {
  if (exceptChar) {
    materialChars = materialChars.replaceAll(exceptChar, "");
  }
  const index = Math.floor(Math.random() * materialChars.length);
  return materialChars.charAt(index);
}

function generatePassword({
  length,
  english,
  numbers,
  mixCase,
  special,
}: {
  length: number;
  english: boolean;
  numbers: boolean;
  mixCase: boolean;
  special: boolean;
}): string {
  const materialChars = getMaterialChars({ english, numbers, mixCase, special });
  let newPassword = "";
  let prevChar: string | undefined = undefined;
  for (let i = 0; i < length; i++) {
    const newChar = pickOneCharExcept(materialChars, prevChar);
    newPassword += newChar;
    prevChar = newChar;
  }
  return newPassword;
}
