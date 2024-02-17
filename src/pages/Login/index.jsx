import "./Login.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db, auth } from "@/utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(null); // Add this line

  useEffect(() => {
    const uid = auth.currentUser ? auth.currentUser.uid : null;
    if (uid) {
      const userDocRef = doc(db, "users", uid);
      getDoc(userDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          setUserImage(docSnapshot.data().avatar);
        }
      });
    }
  }, [isUserLoggedIn]); // Add isUserLoggedIn as a dependency

  const onRegister = (event) => {
    event.preventDefault();
    if (passwordOne === passwordTwo) {
      createUserWithEmailAndPassword(auth, email, passwordOne)
        .then((authUser) => {
          router.push("/");
        })
        .catch((error) => {
          console.error("Erro ao criar usuário:", error);
          toast.error(`Falha ao criar usuário: ${error.message}`);
        });
    } else {
      toast.error("Senhas estão diferentes!");
    }
  };

  const onLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, passwordOne)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        toast.success("Você está logado!");
        router.push("/"); // redirect to dashboard or any other page
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        toast.error("Falha ao logar!  ");
      });
  };
  const onForgotPassword = (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Email de redefinição de senha enviado!");
      })
      .catch((error) => {
        toast.error(
          `Falha ao enviar email de redefinição de senha: ${error.message}`
        );
      });
  };

  return (
    <div className="content">
      <ToastContainer />

      <div className="container">
        <input type="checkbox" id="check" />
        <div className="login form">
          <div className="titulo">Login</div>
          <form onSubmit={onLogin}>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={passwordOne}
              onChange={(e) => setPasswordOne(e.target.value)}
              autoComplete="current-password"
            />
            <a href="#" onClick={onForgotPassword}>
              Esqueceu a senha?
            </a>{" "}
            <input type="submit" className="button" value="Login" />
          </form>
          <div className="signup">
            <span className="signup">
              Não tem uma conta? <label htmlFor="check">Registrar</label>
            </span>
          </div>
        </div>
        <div className="registration form">
          <div className="titulo">Registrar</div>
          <form onSubmit={onRegister}>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Create a password"
              value={passwordOne}
              onChange={(e) => setPasswordOne(e.target.value)}
              autoComplete="new-password"
            />
            <input
              type="password"
              placeholder="Confirm your password"
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
              autoComplete="new-password"
            />
            <input type="submit" className="button" value="Signup" />
          </form>
          <div className="signup">
            <span className="signup">
              Já tem uma conta? <label htmlFor="check">Login</label>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
