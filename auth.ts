import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],

  // Callback functions executed after successful authentication
  callbacks: {
    async signIn({ 
      user: { name, email, image },
      profile: { id, login, bio } 
    }) {
      const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { 
        id,
       });

       if(!existingUser) {
        await writeClient.create({
          _type: 'author',
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
       }

       // Continue signin process
       return true;
    },
    
    // Modify the default JWT token and add author ID to it
    async jwt({ token, account, profile }) {
      // IF user exists, get user from Sanity
      if (account && profile) {
        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });

        if (user) {
          token.id = user?._id;
        }
      }

      // Allows us to connect a github user with a sanity author
      return token;
    },

    // Callback function to allow us use the ID
    async session({ session, token }) {
      // Pass profile id to the token
      Object.assign(session, {id: token.id});
      return session;
    }
  }
})


