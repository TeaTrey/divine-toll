import NextAuth, { NextAuthOptions } from "next-auth";
import { OAuthConfig } from "next-auth/providers";
import { EndpointHandler } from "next-auth/providers";

// const authOptions = {
//   providers: [
//     {
//       id: "poe",
//       name: "Path of Exile",
//       type: "oauth",
//       version: "2.0",
//       authorization: {
//         url: "https://www.pathofexile.com/oauth/authorize",
//         params: { grant_type: "authorization_code",
//         response_type: "code",
//         client_id: process.env.POE_CLIENT_ID,
//         redirect_uri: process.env.POE_REDIRECT_URI,
//         scope: "account:profile",
//         state: "1234567890",

//        },
//       },
//       token: {
//         url: "https://kauth.kakao.com/oauth/token",
//         params:
//       },
//       userinfo: "https://api.pathofexile.com/profile",
//       profile(profile: any) {
//         console.log('PROFILE:', profile)
//         return {
//           id: profile.uuid,
//           name: profile.name,
//         };
//       },
//     } satisfies OAuthConfig<any>,
//   ],
// } satisfies NextAuthOptions;

const authOptions = {
  providers: [
    {
      id: "poe",
      name: "Path of Exile",
      type: "oauth",
      version: "2.0",

      authorization: {
        url: "https://www.pathofexile.com/oauth/authorize",
        params: {
          grant_type: "authorization_code",
          scope: "account:profile account:stashes",
          redirect_uri: process.env.POE_REDIRECT_URI,
          clientID: process.env.POE_CLIENT_ID,
        },
      },
      token: {
        url: "https://www.pathofexile.com/oauth/token",
        params: {
          grant_type: "authorization_code",
          scope: "account:profile account:stashes",
          redirect_uri: process.env.POE_REDIRECT_URI,
          clientId: process.env.POE_CLIENT_ID,
          clientSecret: process.env.POE_CLIENT_SECRET,
        },
      },
      userinfo: "https://api.pathofexile.com/profile",
      // stashinfo: "https://api.pathofexile.com/stash",
      checks: ["state", "pkce"],
      clientId: process.env.POE_CLIENT_ID,
      clientSecret: process.env.POE_CLIENT_SECRET,
      profile(profile: any) {
        console.log("PROFILE:", profile);
        return {
          id: profile.uuid,
          name: profile.name,
        };
      },
    } satisfies OAuthConfig<any>,
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log(`Token: ${JSON.stringify(token)}`);
      console.log(`User: ${JSON.stringify(user)}`);
      console.log(`Account: ${JSON.stringify(account)}`);
      console.log(`Profile: ${JSON.stringify(profile)}`);
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      console.log(`SESSION: ${JSON.stringify(session)} `);
      return session;
    },
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
