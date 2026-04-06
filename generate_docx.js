const fs = require("fs");
const path = require("path");
const {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  PageBreak,
  Paragraph,
  TextRun,
} = require("docx");

const rootDir = path.resolve(__dirname);
const sourcePath = path.join(rootDir, "slides_v3", "SPEAKER_SCRIPT.md");
const outputPaths = [
  path.join(rootDir, "SPEAKER_SCRIPT.docx"),
  path.join(rootDir, "slides_v3", "SPEAKER_SCRIPT.docx"),
];

const source = fs.readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
const lines = source.split("\n");

const COLORS = {
  navy: "102A43",
  teal: "147D64",
  coral: "D56743",
  ink: "1F2933",
  muted: "52606D",
  line: "D9E2EC",
};

function parseInline(text, opts = {}) {
  const size = opts.size ?? 22;
  const baseFont = opts.font ?? "Aptos";
  const monoFont = opts.monoFont ?? "Consolas";
  const runs = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;

  for (const match of text.matchAll(regex)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      runs.push(
        new TextRun({
          text: text.slice(lastIndex, index),
          font: baseFont,
          size,
          color: opts.color,
          bold: opts.bold,
          italics: opts.italics,
        }),
      );
    }

    const token = match[0];
    if (token.startsWith("`")) {
      runs.push(
        new TextRun({
          text: token.slice(1, -1),
          font: monoFont,
          size,
          color: opts.codeColor ?? COLORS.navy,
          shading: { fill: "EEF4F7" },
        }),
      );
    } else if (token.startsWith("**")) {
      runs.push(
        new TextRun({
          text: token.slice(2, -2),
          font: baseFont,
          size,
          color: opts.color,
          bold: true,
        }),
      );
    } else {
      runs.push(
        new TextRun({
          text: token.slice(1, -1),
          font: baseFont,
          size,
          color: opts.color,
          italics: true,
        }),
      );
    }

    lastIndex = index + token.length;
  }

  if (lastIndex < text.length) {
    runs.push(
      new TextRun({
        text: text.slice(lastIndex),
        font: baseFont,
        size,
        color: opts.color,
        bold: opts.bold,
        italics: opts.italics,
      }),
    );
  }

  if (runs.length === 0) {
    runs.push(
      new TextRun({
        text: "",
        font: baseFont,
        size,
        color: opts.color,
      }),
    );
  }

  return runs;
}

function paragraphFromText(text, options = {}) {
  return new Paragraph({
    children: parseInline(text, {
      size: options.size,
      color: options.color,
      bold: options.bold,
      italics: options.italics,
    }),
    spacing: {
      before: options.before ?? 0,
      after: options.after ?? 120,
      line: options.line ?? 320,
    },
    indent: options.indent ? { left: options.indent } : undefined,
    alignment: options.alignment,
    border: options.border,
    shading: options.shading,
  });
}

function divider() {
  return new Paragraph({
    border: {
      bottom: {
        color: COLORS.line,
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
    spacing: { before: 120, after: 180 },
  });
}

const children = [];

children.push(
  new Paragraph({
    children: [
      new TextRun({
        text: "Speaker Script",
        bold: true,
        size: 36,
        color: COLORS.navy,
        font: "Aptos Display",
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 300, after: 80 },
  }),
);
children.push(
  new Paragraph({
    children: [
      new TextRun({
        text: "Versi Word dari slides_v3/SPEAKER_SCRIPT.md",
        size: 22,
        color: COLORS.muted,
        font: "Aptos",
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
);
children.push(
  new Paragraph({
    children: [
      new TextRun({
        text: `Dibuat otomatis pada ${new Date().toLocaleString("id-ID", {
          dateStyle: "long",
          timeStyle: "short",
          timeZone: "Asia/Jakarta",
        })}`,
        size: 18,
        color: COLORS.muted,
        font: "Aptos",
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 220 },
  }),
);
children.push(divider());

let seenFirstTitle = false;

for (const rawLine of lines) {
  const line = rawLine.trimEnd();

  if (line.trim() === "") {
    continue;
  }

  if (line.startsWith("# ")) {
    if (seenFirstTitle) {
      children.push(new Paragraph({ children: [new PageBreak()] }));
    }
    seenFirstTitle = true;
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: line.slice(2).trim(),
            bold: true,
            size: 34,
            color: COLORS.navy,
            font: "Aptos Display",
          }),
        ],
        spacing: { before: 120, after: 160 },
      }),
    );
    continue;
  }

  if (line.startsWith("## ")) {
    const title = line.slice(3).trim();
    if (/^Slide\s+\d+\./i.test(title)) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: title,
              bold: true,
              size: 28,
              color: "FFFFFF",
              font: "Aptos Display",
            }),
          ],
          shading: { fill: COLORS.navy },
          spacing: { before: 220, after: 120 },
          indent: { left: 120, right: 120 },
        }),
      );
    } else {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: title,
              bold: true,
              size: 26,
              color: COLORS.teal,
              font: "Aptos Display",
            }),
          ],
          spacing: { before: 220, after: 120 },
        }),
      );
    }
    continue;
  }

  if (line.startsWith("### ")) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: line.slice(4).trim(),
            bold: true,
            size: 22,
            color: COLORS.navy,
            font: "Aptos",
          }),
        ],
        spacing: { before: 180, after: 90 },
      }),
    );
    continue;
  }

  if (line.startsWith("- ")) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "• ",
            bold: true,
            size: 22,
            color: COLORS.coral,
            font: "Aptos",
          }),
          ...parseInline(line.slice(2).trim(), { size: 22, color: COLORS.ink }),
        ],
        spacing: { after: 70, line: 320 },
        indent: { left: 360, hanging: 220 },
      }),
    );
    continue;
  }

  if (/^(Deck|Audience|Durasi target|Style|Durasi|Tujuan|Script|Script instruksi|Transisi|Stage cue|Kalimat kunci|Facilitation cue|Closing cue|Opsional closing line):/i.test(line)) {
    const separator = line.indexOf(":");
    const label = line.slice(0, separator);
    const value = line.slice(separator + 1).trim();
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${label}: `,
            bold: true,
            size: 22,
            color: COLORS.navy,
            font: "Aptos",
          }),
          ...parseInline(value, { size: 22, color: COLORS.ink }),
        ],
        spacing: { after: 90, line: 320 },
      }),
    );
    continue;
  }

  if (/^"(.+)"$/.test(line.trim())) {
    children.push(
      paragraphFromText(line.trim(), {
        italics: true,
        color: COLORS.navy,
        indent: 540,
        after: 110,
        border: {
          left: {
            color: COLORS.teal,
            style: BorderStyle.SINGLE,
            size: 8,
            space: 10,
          },
        },
      }),
    );
    continue;
  }

  children.push(
    paragraphFromText(line.trim(), {
      color: COLORS.ink,
      after: 90,
    }),
  );
}

const doc = new Document({
  creator: "Codex",
  title: "Speaker Script - MedTech Lecture",
  description: "Word export generated from slides_v3/SPEAKER_SCRIPT.md",
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 1000,
            right: 1000,
            bottom: 1000,
            left: 1000,
          },
        },
      },
      children,
    },
  ],
});

async function main() {
  const buffer = await Packer.toBuffer(doc);
  for (const targetPath of outputPaths) {
    fs.writeFileSync(targetPath, buffer);
  }
  console.log("Created DOCX:");
  for (const targetPath of outputPaths) {
    console.log(`- ${targetPath}`);
  }
}

main().catch((error) => {
  console.error("Failed to generate DOCX:", error);
  process.exitCode = 1;
});
