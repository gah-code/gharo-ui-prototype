import fs from 'node:fs';
import path from 'node:path';

function readFileContent(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(fullPath, 'utf8');
}

function guessLanguage(file) {
  if (file.endsWith('.ts') || file.endsWith('.tsx')) return 'ts';
  if (file.endsWith('.js') || file.endsWith('.jsx')) return 'js';
  if (file.endsWith('.css')) return 'css';
  if (file.endsWith('.json')) return 'json';
  if (file.endsWith('.md')) return 'md';
  return '';
}

export function buildCheckpointPayload(options) {
  const { name, description, files } = options;

  const artifacts = files
    .map((file) => {
      const content = readFileContent(file);
      const lang = guessLanguage(file);
      return `### File: ${file}\n\n\`\`\`${lang}\n${content}\n\`\`\``;
    })
    .join('\n\n');

  return [
    `# Agent Checkpoint: ${name}`,
    `## Context`,
    description,
    `## Artifacts`,
    artifacts,
    `## Questions`,
    '- [ ] Fill in specific questions here before sending to ChatGPT',
  ].join('\n\n');
}

// --- CLI mode ---
// Usage:
//   node agent/scripts/buildCheckpointPayload.mjs "Name" "Description" file1 file2 ...
const isDirectRun = process.argv[1] && new URL(import.meta.url).pathname === process.argv[1];

if (isDirectRun) {
  const [, , name, description, ...files] = process.argv;

  if (!name || !description || files.length === 0) {
    console.error(
      `Usage:\n  node agent/scripts/buildCheckpointPayload.mjs "Name" "Description" file1 file2 ...\n\nExample:\n  node agent/scripts/buildCheckpointPayload.mjs "Static Data Shape Review" "Initial static model for personal landing page" src/data/page-personal-landing.ts`
    );
    process.exit(1);
  }

  const payload = buildCheckpointPayload({ name, description, files });
  console.log(payload);
}
