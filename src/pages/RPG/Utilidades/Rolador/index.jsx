import { useState } from "react";
import "./Rolador.css";
import Image from "next/image";

export default function Rolador() {
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
      hour: "2-digit",
      minute: "2-digit",
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

    result = `${timestamp} Rolou: ${result} = ${totalSum}`; // Adiciona o horário ao início do resultado
    setResultText(result); // Atualize o estado com o novo texto do resultado
    setLogs((prevLogs) => [...prevLogs, result]); // Adicione o resultado aos logs
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

  return (
    <div className="content">
      <h1>Rolador de Dados</h1>
      <div className="dices">
        {diceTypes.map((dice) => (
          <Image
            key={dice}
            src={`/dices/d${dice}.svg`}
            height={80}
            width={80}
            onClick={() => handleDiceClick(dice)}
          />
        ))}
        <input type="number" value={inputValue} onChange={handleInputChange} />
      </div>
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
      <div className="logs">
        <h2>Logs</h2>
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
  );
}
