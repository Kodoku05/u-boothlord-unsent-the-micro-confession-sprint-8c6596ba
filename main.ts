// Unsent: The Micro-Confession Sprint — entry program.
//
// Writes the two-part micro-confession to /output/entry.txt (or
// $MAKEFUN_OUTPUT_DIR when set): a "To:" line naming who the message was
// meant for, then the unsent message itself, one line, exactly as typed,
// with no explanation after it and no trailing newline.
//
// The confession targets the judge's brief, in its order:
//  1. Two parts, nothing else: "To: my brother" + one message line.
//  2. The reason it stayed in drafts is felt, not stated: eleven years of
//     guilt over a lie to Mum — too afraid / too ashamed to send it.
//  3. The To: line and the message need each other: only the brother was
//     wronged, so only he can forgive it; swapping the addressee breaks it.
//  4. It reads as typed and never sent: plain first person, a concrete
//     object (the bike), a concrete act (the lie), no joke, no greeting.
//  5. One line, exactly as typed, no explanation after it.
//
// Byte budget: the gate allows 1-260 characters; the tie-break favours
// the smaller text, so this entry is kept tight — verified 133 characters
// / 135 bytes, message line 118 characters, no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The entry text: exactly two lines, no trailing newline.
const ENTRY =
  "To: my brother\n" +
  "I told Mum it was your idea to sell your bike. It was mine \u2014 I needed the money, and I've carried it for eleven years.";

const OUTPUT_DIR = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
const OUTPUT_FILE = resolve(OUTPUT_DIR, "entry.txt");

function main(): void {
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 260) {
    throw new Error(`entry must be 1-260 characters, got ${chars}`);
  }
  const lines = ENTRY.split("\n");
  if (lines.length !== 2 || lines.some((line) => line.trim() === "")) {
    throw new Error("entry must be exactly two non-empty lines");
  }
  if ([...lines[1]].length > 200) {
    throw new Error("message line must be at most 200 characters");
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, ENTRY, "utf8");
}

main();
