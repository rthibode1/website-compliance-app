import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { auth } from "@repo/firebase";

export const authClient = {
  signIn: {
    email: async (credentials) => {
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
        return { data: { user }, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },
  },
  signUp: {
    email: async (credentials) => {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
        return { data: { user }, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },
  },
};
