import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/pages/_app"; // Import your Firebase auth object

export function useRequireLogin() {
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/Login");
      }
    });
  }, [router]);
}
