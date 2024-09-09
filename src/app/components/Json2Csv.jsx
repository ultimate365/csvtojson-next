"use client";
import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
const Json2Csv = () => {
  const [csvData, setCsvData] = useState(null);
  const [fileName, setFileName] = useState("");

  // Convert JSON to CSV
  const jsonToCsv = (json) => {
    const array = typeof json !== "object" ? JSON.parse(json) : json;
    const headers = Object.keys(array[0]);

    const csvRows = [];
    csvRows.push(headers.join(",")); // Add headers row

    array.forEach((row) => {
      const values = headers.map((header) => {
        const escapedValue = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escapedValue}"`; // Escape double quotes in values
      });
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const jsonData = JSON.parse(event.target.result);
      const csv = jsonToCsv(jsonData);
      setCsvData(csv);
      setFileName(file.name.replace(".json", ".csv"));
    };

    reader.readAsText(file);
  };

  // Generate CSV download link
  const downloadCsv = () => {
    const blob = new Blob([csvData], { type: "text/csv" });
    if (typeof window !== "undefined") {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setCsvData(null);
      setFileName("");
      // Clear file input field
      document.getElementById("formFile").value = "";
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-success fs-bold">JSON to CSV Converter</h2>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload a JSON file</Form.Label>
          <Form.Control
            type="file"
            accept=".json"
            onChange={handleFileChange}
          />
        </Form.Group>
      </Form>

      {csvData && (
        <Button className="mt-3" onClick={downloadCsv}>
          Download CSV
        </Button>
      )}
    </Container>
  );
};

export default Json2Csv;
