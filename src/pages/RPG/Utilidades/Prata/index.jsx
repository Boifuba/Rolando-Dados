import { useState, useEffect, useCallback } from "react";
import { NextSeo } from "next-seo";
import ShareButtons from "@/components/SharedButtons/SharedButons";

import "./Prata.css";

export default function Prata() {
  const [kilos, setKilos] = useState("");
  const [pounds, setPounds] = useState("");
  const [coins, setCoins] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const convertSilver = useCallback(() => {
    const silverPrice = 4;
    const silverWeightKilos = 0.0018;
    const silverWeightPounds = 0.004;

    let kilosResult = 0;
    let poundsResult = 0;
    let coinsResult = 0;
    let valueResult = 0;

    if (kilos) {
      kilosResult = parseFloat(kilos);
      poundsResult = kilosResult * 2.20462;
      coinsResult = kilosResult / silverWeightKilos;
      valueResult = coinsResult * silverPrice;
    } else if (pounds) {
      poundsResult = parseFloat(pounds);
      kilosResult = poundsResult / 2.20462;
      coinsResult = poundsResult / silverWeightPounds;
      valueResult = coinsResult * silverPrice;
    } else if (coins) {
      coinsResult = parseFloat(coins);
      kilosResult = coinsResult * silverWeightKilos;
      poundsResult = coinsResult * silverWeightPounds;
      valueResult = coinsResult * silverPrice;
    } else if (value) {
      valueResult = parseFloat(value);
      coinsResult = valueResult / silverPrice;
      kilosResult = coinsResult * silverWeightKilos;
      poundsResult = coinsResult * silverWeightPounds;
    }

    setResult(
      `Kilos: ${kilosResult.toFixed(2)}, Pounds: ${poundsResult.toFixed(
        2
      )}, Coins: ${coinsResult.toFixed(
        2
      )}, Value: $${valueResult.toLocaleString("en-US", {
        minimumFractionDigits: 0,
      })}`
    );
  }, [coins, kilos, pounds, value]);

  const handleInputChange = (inputName, inputValue) => {
    let formattedInputValue = inputValue;
    if (inputName === "kilos") {
      formattedInputValue = parseFloat(parseFloat(inputValue).toFixed(2));
    }
    setKilos(inputName === "kilos" ? formattedInputValue : "");
    setPounds(inputName === "pounds" ? inputValue : "");
    setCoins(inputName === "coins" ? inputValue : "");
    setValue(inputName === "value" ? inputValue : "");
    convertSilver();
  };
  return (
    <>
      <NextSeo
        title="Rolando Dados"
        description="Um site de RPG com campanhas e aventuras para mestres e jogadores."
        canonical="https://www.rolandodados.com.br/RPG/Utilidades/Prata"
        openGraph={{
          url: "https://www.rolandodados.com.br/RPG/Utilidades/Prata",
          title: "Calculadora de Prata para RPG de Mesa",
          description:
            "Agora quando NPC disser que vai pagar o seu peso em prata, você vai saber quanto vai ganhar!",
          images: [
            {
              url: "https://rolandodados.com.br/Utilidades/Prata/silver.jpg",
              width: 800,
              height: 600,
              alt: "Imagem da Calculadora de Prata para RPG",
            },
          ],
        }}
      />
      <div className="content">
        <ShareButtons
          url="https://rolandodados.com.br/RPG/Utilidades/Prata"
          title="Calculadora de Prata para RPG de Mesa"
        />{" "}
        <div className="tm-flex-center container-fluid shadow">
          <div className="box-image">
            <h1>Calculadora de Prata</h1>
            <p>
              Essa calculadora foi criada para resolver um dos maiores problemas
              do GURPS que é calcular o peso do loot. E eu acho muito mais
              impactante quando o NPC diz: Se fizerem isso eu pago o seu peso em
              prata! Eu estou usando medidas oficiais do livro e futuramente eu
              pretendo extender para outros tipos de moeda. Espero que isso
              facilite a vida da sua mesa de RPG.{" "}
            </p>
          </div>
          <div className="box-text">
            <div className="grid-2">
              <div className="input-box">
                <label htmlFor="kilos">Kilos</label>
                <input
                  type="text"
                  id="kilos"
                  value={kilos}
                  onChange={(e) => handleInputChange("kilos", e.target.value)}
                  placeholder="Enter kilos"
                />

                <label htmlFor="pounds">Pounds</label>
                <input
                  type="text"
                  id="pounds"
                  value={pounds}
                  onChange={(e) => handleInputChange("pounds", e.target.value)}
                  placeholder="Enter pounds"
                />

                <label htmlFor="coins">Coins</label>
                <input
                  type="text"
                  id="coins"
                  value={coins}
                  onChange={(e) => handleInputChange("coins", e.target.value)}
                  placeholder="Enter coins"
                />

                <label htmlFor="value">Value</label>
                <input
                  type="text"
                  id="value"
                  value={value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                  placeholder="Enter value"
                />
              </div>
              <div className="text-box">
                <p>
                  Esse conversor usa os seguintes valores para a conversão:
                  0.004 libras, 0.0018 kilogramas, e $4 baseado no GURPS Módulo
                  Básico. Se Você precisa de valores diferentes, por favor me
                  mande uma mensagem!
                </p>
                <div className="result-div">
                  <div className="result-title">Resultado</div> {result}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
