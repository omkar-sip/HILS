import fs from 'fs';
const code = fs.readFileSync("chunk_new.js", "utf8");
const match = code.match(/.{0,50}API Key defined:.{0,50}/);
console.log("Surrounding code:", match ? match[0] : "Not found");
