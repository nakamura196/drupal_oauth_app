export const authOptions = {
  // debug: true, // next-auth のデバッグモードを有効化
  providers: [
    {
      id: "drupal",
      name: "Drupal",
      type: "oauth",
      clientId: process.env.DRUPAL_CLIENT_ID,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET,
      authorization: {
        url: process.env.DRUPAL_AUTH_URL,
        params: {
          scope: process.env.DRUPAL_SCOPE,
          response_type: "code",
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/drupal`, // 環境変数からリダイレクトURIを構築
        },
      },
      token: {
        async request(context) {
          const body = new URLSearchParams({
            client_id: process.env.DRUPAL_CLIENT_ID, // 明示的に client_id を追加
            client_secret: process.env.DRUPAL_CLIENT_SECRET,
            code: context.params.code, // 認可コード
            grant_type: "authorization_code",
            redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/drupal`,
          });

          const res = await fetch(process.env.DRUPAL_TOKEN_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
          });

          const json = await res.json(); // Parse the response body once

          if (!res.ok) {
            throw new Error(`Token request failed: ${res.statusText}`);
          }

          return {
            tokens: json
          }
        }
      },
      profile(profile) {
        return {
          id: profile.sub, // "sub" をユーザーの一意のIDとして利用
          name: profile.name || profile.preferred_username || "Unknown User", // 名前の優先順位を設定
          email: profile.email || "No Email Provided", // メールがない場合のフォールバック
          image: profile.profile || null, // プロファイルURLを画像として使用（必要に応じて調整）
        }
      },
    },
  ],
  callbacks: {
    async session({ session, token }) {
      // トークンからセッションに必要な情報を追加
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },

    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id; // プロファイルからユーザーIDをトークンに保存
      }
      return token;
    },
  },
};