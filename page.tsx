import { Metadata } from "next";
import SafePasswordGen from "./SafePasswordGen";

export const metadata: Metadata = {
  title: "Attention Project",
  description: "2025 Wabu High School Attention Project",
};

export default function Page() {
  return (
    <>
      <hgroup>
        <h1>Safe Password Generator</h1>
        <p>안전한 비밀번호 생성기</p>
      </hgroup>
      <p>이 프로그램은 와부고등학교 동아리 ATTENTION의 프로젝트로 제작되었습니다.</p>
      <SafePasswordGen />
    </>
  );
}
