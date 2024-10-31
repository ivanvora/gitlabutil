import fs from "node:fs";

export const writefile = (text: string, filepath: string) => {
  fs.writeFile(filepath, text, (e) => {
    console.log(e);
  });
};
