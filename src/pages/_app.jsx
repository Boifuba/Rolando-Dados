// pages/_app.js
import RootLayout from "../app/layout";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Importe getStorage
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@/utils/UserContext";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";

const firebaseConfig = {
  apiKey: "AIzaSyC4oKmEgPGS2onNrartQc6Cwvd1yEkqnYs",
  authDomain: "warez-7198a.firebaseapp.com",
  projectId: "warez-7198a",
  storageBucket: "warez-7198a.appspot.com",
  messagingSenderId: "98244594618",
  appId: "1:98244594618:web:81d7330da6451d22a76b83",
  measurementId: "G-QVD8VW7D3W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app); // Inicialize o Firebase Storage
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <RootLayout>
        <UserProvider>
          <Navigation />

          <Component {...pageProps} />

          <Footer />
        </UserProvider>
      </RootLayout>
    </ThemeProvider>
  );
}

export default MyApp;
