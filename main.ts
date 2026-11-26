import { mkdirSync, writeFileSync } from "node:fs";

const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ||
  process.env.MAKEFUN_OUTPUT ||
  "/output";

const answer = "Reworkaholic";

mkdirSync(outputDir, { recursive: true });

writeFileSync(`${outputDir}/entry.txt`, answer, "utf8");
