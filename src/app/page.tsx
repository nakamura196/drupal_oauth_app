"use client";

import { useAuth } from "@/hooks/useAuth"; // 新しく作成したカスタムフックをインポート
import Hero from "./components/Hero";

export default function MyData() {
  const { session, handleSignIn } = useAuth(); // useAuth フックを使用

  return (
    <>
      {session ? (
        <div className="container mx-auto py-10 px-4">
          {/* ユーザー情報を表示 */}
          <h1 className="text-2xl font-bold">{session.user.name}</h1>
          <p className="text-gray-500">User ID: {session.user.id}</p>
        </div>
      ) : (
        <Hero handleSignIn={handleSignIn} />
      )}
    </>
  );
}
