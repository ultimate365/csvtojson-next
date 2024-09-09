"use client";
import React, { useState } from "react";
import Csv2JSON from "./components/Csv2Json";
import Json2Csv from "./components/Json2Csv";
import { Heading } from "@chakra-ui/react";

export default function Home() {
  const [csvToJSON, setCsvToJSON] = useState(false);
  const [JsonToCsv, setJsonToCsv] = useState(false);

  return (
    <main
      style={{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginTop: 20,
      }}
    >
      <Heading color={"navy"} textAlign={"center"} className="text-center">
        Select Your Conversion Type
      </Heading>
      <button
        type="button"
        className="btn btn-primary m-2"
        onClick={() => {
          setCsvToJSON(true);
          setJsonToCsv(false);
        }}
      >
        JSON to CSV
      </button>
      <button
        type="button"
        className="btn btn-success m-2"
        onClick={() => {
          setCsvToJSON(false);
          setJsonToCsv(true);
        }}
      >
        CSV to JSON
      </button>
      {csvToJSON && <Csv2JSON />}
      {JsonToCsv && <Json2Csv />}
    </main>
  );
}
