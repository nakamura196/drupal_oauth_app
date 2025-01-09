// hooks/useAuth.ts
import { signIn, signOut, useSession } from "next-auth/react";

export function useAuth() {
  const { data: session } = useSession() as {
    data: {
      user: {
        id: string;
        name?: string | null;
        email?: string | null;
      };
      accessToken: string;
    } | null;
  };

  const handleSignIn = () => {
    signIn("drupal"); // GakuNin RDM のプロバイダー名
  };

  const handleSignOut = () => {
    signOut();
  };

  return {
    session,
    handleSignIn,
    handleSignOut,
  };
}
