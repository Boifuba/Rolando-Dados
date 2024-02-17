import { useState } from "react";
import "./Rolador.css";
import Image from "next/image";
import Head from "next/head";

export default function RoladorDeDados() {
  const [diceArray, setDiceArray] = useState([]);
  const [logs, setLogs] = useState([]);
  const [resultText, setResultText] = useState(""); // Adicionado estado para o texto do resultado
  const [inputValue, setInputValue] = useState(0);

  const diceTypes = [4, 6, 8, 10, 12, 20];

  const handleInputChange = (event) => {
    setInputValue(Number(event.target.value));
  };

  const handleDiceClick = (sides) => {
    setDiceArray((prevArray) => {
      const newArray = [...prevArray];
      const index = newArray.findIndex(([count, s]) => s === sides);
      if (index !== -1) {
        newArray[index][0]++;
      } else {
        newArray.push([1, sides]);
      }
      return newArray;
    });
  };

  const handleClearClick = () => {
    setDiceArray([]);
  };

  const rollDice = (quantity, sides) => {
    return Array.from(
      { length: quantity },
      () => Math.floor(Math.random() * sides) + 1
    );
  };

  const handleRollClick = () => {
    let result = "";
    let totalSum = 0; // Inicia a soma total com 0

    const now = new Date();
    const timestamp = now.toLocaleTimeString([], {
      // minute: "2-digit",
      hour12: false,
    });

    diceArray.forEach(([quantity, sides], index) => {
      const rolls = rollDice(quantity, sides);
      const sum = rolls.reduce((a, b) => a + b, 0);
      totalSum += sum;
      if (index !== 0) {
        result += " + ";
      }
      result += `${quantity}d${sides}(${rolls.join(", ")})`;
    });

    // Se o valor do input for maior que 0, inclua-o na soma e no resultado
    if (inputValue > 0) {
      totalSum += inputValue;
      result += ` + ${inputValue}`;
    }

    result = `${timestamp} - Rolagem: ${result} = ${totalSum}`;
    setResultText(result);
    setLogs((prevLogs) => [...prevLogs, result]);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleDownloadLogs = () => {
    const logText = logs.join("\n");
    const blob = new Blob([logText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "logs.txt";
    link.click();
  };
  //pro log
  function capitalizeWords(string) {
    return string.replace(/\b\w/g, (char, index, originalText) => {
      // Se a palavra e de, mantém em minúsculas
      if (originalText.substr(index, 3) === "de ") {
        return char.toLowerCase();
      }
      // Caso contrário, capitaliza a primeira letra
      return char.toUpperCase();
    });
  }

  function getFormattedDate() {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("pt-BR", options);
    return capitalizeWords(formattedDate);
  }

  //  rich
  function richSnipper() {
    return {
      __html: `{
        "@context": "http://schema.org",
        "@type": "SoftwareApplication",
        "name": "Rolador de Dados",
        "image": "https://rolandodados.com.br/_next/image?url=%2Frd.png&w=384&q=75",
        "url": "https://rolandodados.com.br/RPG/Utilidades/Rolador",
        "author": {
          "@type": "Person",
          "name": "Boifubá"
        },
        "datePublished": "2024-01-28",
        "publisher": {
          "@type": "Organization",
          "name": "Rolando Dados"
        },
        "operatingSystem": "Windows, Linux, MacOS",
        "requirements": "Internet",
        "softwareVersion": "1.0"
      }
      }`,
    };
  }

  return (
    <>
      <Head>
        <title>Rolador de Dados Online</title>
        <link rel="icon" href="/favicon.png" />

        <meta
          name="description"
          content="Rolador de dados para qualquer sistema de RPG"
        />
        <meta
          property="og:image"
          content={"https://rolandodados.com.br/face.jpg"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta name="author" content="Boifubá" />

        <meta property="og:title" content="Rolador de Dados Online" />
        <meta
          property="og:url"
          content="https://www.rolandodados.com.br/RPG/Utilidades/Rolador"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Rolador de dados online para qualquer sistema de RPG"
        />
        <meta property="og:site_name" content="Rolador de Dados Online" />

        <meta name="theme-color" content="#ea4f4c"></meta>
      </Head>
      *{" "}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={richSnipper()}
        key="product-jsonld"
      />
      <main>
        <div className="content">
          <h1>Rolador de Dados Online</h1>
          <p>
            Esse é um rolador de dados multisistemas que permite que você faça
            roolagens combinadas de dados com modificadores. Para usar clique
            nos dados desejadoos para adicioná-los ao bucket e pressione Rolar.
            Ao final você pode baixar uma arquivo de texto com todas as rolagens
            da sessão.{" "}
          </p>
          <h2>Escolha os dados</h2>
          <div className="dices">
            {diceTypes.map((dice) => (
              <Image
                key={dice}
                src={`/dices/d${dice}.svg`}
                height={80}
                width={80}
                onClick={() => handleDiceClick(dice)}
                alt={"Dado de RPG de Mesa"}
              />
            ))}
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <h2>Rolador</h2>
          <div className="poll" id="poll">
            {diceArray.map(([count, sides], index) => (
              <div key={sides}>
                {index > 0 && <span className="numeros">+</span>}
                <span className="numeros">{count}</span>
                <Image src={`/dices/d${sides}.svg`} height={80} width={80} />
              </div>
            ))}
          </div>

          <div className="buttons-container">
            <button className="button" onClick={handleClearClick}>
              Limpar
            </button>
            <button className="button" onClick={handleRollClick}>
              Rolar
            </button>
          </div>
          <h2>Registro de Rolagens</h2>
          <div className="logs">
            <h3 className="logs-title">{getFormattedDate()}</h3>
            {logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </div>
          <div className="buttons-container ">
            <button className="button" onClick={handleClearLogs}>
              Limpar Logs
            </button>
            <button className="button" onClick={handleDownloadLogs}>
              Baixar Logs
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
