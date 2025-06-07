import { Metadata } from "next";
import SafePasswordGen from "./SafePasswordGen";
import Link from "next/link";

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
      <p>
        <Link href="https://github.com/gunny091/attention_safepassgen" target="_blank">
          코드 보기
        </Link>
      </p>
      <SafePasswordGen />
    </>
  );
}
