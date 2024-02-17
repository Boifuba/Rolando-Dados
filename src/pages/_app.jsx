import RootLayout from "../app/layout";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@/utils/UserContext";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";

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
