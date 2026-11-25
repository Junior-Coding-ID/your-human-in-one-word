import * as fs from "node:fs";
import * as path from "node:path";

// One word for Yono: never stops, orders at 2am, never waits,
// always wants faster and rank #1. No explanation needed.
const TEXT = "Relentless";

if (TEXT.length < 1 || TEXT.length > 30) {
  throw new Error(`TEXT must be 1-30 characters, got ${TEXT.length}`);
}
if (TEXT.includes(" ") || TEXT.includes("\n") || TEXT.includes("\r") || TEXT.includes("\t")) {
  throw new Error("TEXT must be a single word with no whitespace");
}
if (TEXT.trim() !== TEXT) {
  throw new Error("TEXT must not have leading or trailing whitespace");
}
if (Buffer.byteLength(TEXT, "utf8") !== TEXT.length) {
  throw new Error("TEXT must be plain ASCII for this one-word entry");
}

const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");
const expected = TEXT + "\n";
fs.writeFileSync(outPath, expected, "utf8");
const back = fs.readFileSync(outPath, "utf8");
if (back !== expected) {
  throw new Error("entry.txt does not match TEXT byte-identically");
}
const backBytes = fs.readFileSync(outPath);
if (!backBytes.equals(Buffer.from(expected, "utf8"))) {
  throw new Error("entry.txt bytes do not match TEXT + newline");
}
console.log(`Wrote ${outPath}: ${JSON.stringify(back)} (${TEXT.length} chars)`);
