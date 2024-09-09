"use client";
import React, { useMemo, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Box, Button, Stack, Heading } from "@chakra-ui/react";

import { CSVReader } from "react-papaparse";
import ReactTable from "./ReactTable";

export default function Csv2JSON() {
  const buttonRef = useRef(null);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [jsonData, setJsonData] = useState([]);
  const [colData, setColData] = useState([]);
  const [rowsData, setRowsData] = useState([]);
  const [columData, setColumData] = useState([]);
  const columns = useMemo(() => columData, [columData]);
  const rows = useMemo(() => rowsData, [rowsData]);

  const handleOnFileLoad = (data) => {
    const columns = data[0].data.map((col, index) => {
      return {
        Header: col,
        accessor: col.split(" ").join("_").toLowerCase(),
      };
    });
    297019;
    const rows = data.slice(1).map((row) => {
      return row.data.reduce((acc, curr, index) => {
        acc[columns[index].accessor] = curr;
        return acc;
      }, {});
    });
    const colD = data[0].data.map((col, index) => {
      return {
        name: col,
      };
    });
    setColData(colD);
    setRowsData(rows);
    setColumData(columns);
    let json = JSON.stringify(rows);
    setJsonData(json);
    setShowDownloadBtn(true);
  };
  const downloadFile = (file) => {
    let blob = new Blob([jsonData], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = `${file ? file.split(".csv")[0] : "data"}.json`;
    a.click();
    setShowDownloadBtn(false);
    buttonRef.current.removeFile();
  };
  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log(data);
  };
  const handleOpenReader = (e) => {
    buttonRef.current.open(e);
  };
  return (
    <div style={{ marginTop: 10 }}>
      <Heading color={"teal"} textAlign={"center"}>
        CSV to JSON Converter
      </Heading>
      <Box>
        <CSVReader
          ref={buttonRef}
          onFileLoad={handleOnFileLoad}
          onError={handleOnError}
          onRemoveFile={handleOnRemoveFile}
        >
          {({ file }) => (
            <Stack margin={10}>
              {!showDownloadBtn ? (
                <Box>
                  <Button onClick={handleOpenReader}>Select CSV File</Button>
                </Box>
              ) : (
                <>
                  <Box>
                    <ReactTable tableColumns={columns} tableData={rows} />
                  </Box>

                  <Box>
                    <Button
                      onClick={() => {
                        downloadFile(file.name);
                      }}
                    >
                      Download
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant={"ghost"}
                      marginTop={10}
                      onClick={() => {
                        setShowDownloadBtn(false);
                        buttonRef.current.removeFile();
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </>
              )}
            </Stack>
          )}
        </CSVReader>
      </Box>
    </div>
  );
}
