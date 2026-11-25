import { writeFileSync, mkdirSync } from "node:fs";

// Build the line from its two beats so the twist stays detachable:
// the setup (agent owns up to its own code) and the punch (it pardons
// itself). Keeping them separate lets the joke's turn be tuned in one place.
function buildEntry(): string {
  const setup =
    "I found the bug, filed a ticket against myself, and marked it 'won't fix'";
  const twist = "I'm the only one who can fix me, and I'm on break.";
  return `${setup} — ${twist}`;
}

const ENTRY = buildEntry();

// The gate counts characters, so enforce the 1-200 char window here and
// also require exactly one line with no trailing whitespace.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${ENTRY.length}`);
}
if (ENTRY.includes("\n") || ENTRY !== ENTRY.trim()) {
  throw new Error("entry must be a single line with no trailing whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to /output/entry.txt`);
