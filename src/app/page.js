"use client";
import React, { useState } from "react";
import Csv2JSON from "./components/Csv2Json";
import Json2Csv from "./components/Json2Csv";

export default function Home() {
  const [csvToJSON, setCsvToJSON] = useState(true);

  return (
    <main
      style={{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setCsvToJSON(!csvToJSON)}
      >
        {csvToJSON ? "JSON to CSV" : "CSV to JSON"}
      </button>
      {csvToJSON ? <Csv2JSON /> : <Json2Csv />}
    </main>
  );
}
