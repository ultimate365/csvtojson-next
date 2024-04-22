import { NextResponse } from "next/server";
import { writeFile, readFile, unlink } from "fs/promises";

export const POST = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const path = `./public/${file.name}`;

  try {
    await writeFile(path, buffer);
    const data = await readFile(path, "utf8");
    let f = data.split("\n");

    let headers = f.shift().split(",");
    let json = [];
    f.forEach(function (d) {
      // Loop through each row
      let tmp = {};
      let row = d.split(",");
      for (let i = 0; i < headers.length; i++) {
        tmp[headers[i]] = row[i];
      }
      // Add object to list
      json.push(tmp);
    });
    await unlink(path);
    return NextResponse.json({ fileData: JSON.stringify(json), status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};

// export const POST = async (req, res) => {
//   const body = await req.json();
//   const url = body.url;
//   console.log(url);
//   try {
//     const data = await readlink(url, "utf8");
//     let f = data.split("\n");

//     let headers = f.shift().split(",");
//     let json = [];
//     f.forEach(function (d) {
//       // Loop through each row
//       let tmp = {};
//       let row = d.split(",");
//       for (let i = 0; i < headers.length; i++) {
//         tmp[headers[i]] = row[i];
//       }
//       // Add object to list
//       json.push(tmp);
//     });

//     return NextResponse.json({ fileData: JSON.stringify(json), status: 201 });
//   } catch (error) {
//     console.log("Error occured ", error);
//     return NextResponse.json({ Message: "Failed", status: 500 });
//   }
// };
