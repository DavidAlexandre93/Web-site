import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const WRITE_MODE = process.argv.includes("--write");
const SUPPORTED_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".yml", ".yaml"]);
const IGNORE_DIRS = new Set([".git", "node_modules", ".next", ".test-dist"]);
const IGNORE_FILES = new Set(["REVIEW_COMPLETO.md", "src/styles/GlobalStyle.ts"]);

const listFiles = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        if (entry.isDirectory()) {
            if (!IGNORE_DIRS.has(entry.name)) {
                files.push(...listFiles(path.join(dir, entry.name)));
            }
            continue;
        }

        const ext = path.extname(entry.name);
        const filePath = path.join(dir, entry.name);
        const relativePath = path.relative(ROOT, filePath);

        if (SUPPORTED_EXTENSIONS.has(ext) && !IGNORE_FILES.has(relativePath)) {
            files.push(filePath);
        }
    }

    return files;
};

const normalize = (content) => {
    const lfOnly = content.replace(/\r\n/g, "\n");
    const noTrailingSpaces = lfOnly
        .split("\n")
        .map((line) => line.replace(/[\t ]+$/g, ""))
        .join("\n");

    return noTrailingSpaces.endsWith("\n") ? noTrailingSpaces : `${noTrailingSpaces}\n`;
};

const files = listFiles(ROOT);
const changed = [];

for (const file of files) {
    const original = fs.readFileSync(file, "utf8");
    const normalized = normalize(original);

    if (normalized !== original) {
        const relativePath = path.relative(ROOT, file);
        changed.push(relativePath);

        if (WRITE_MODE) {
            fs.writeFileSync(file, normalized, "utf8");
        }
    }
}

if (changed.length > 0 && !WRITE_MODE) {
    console.error("Arquivos com formatação inconsistente:");
    for (const file of changed) {
        console.error(`- ${file}`);
    }
    process.exit(1);
}

if (WRITE_MODE) {
    console.log(`Formatação aplicada em ${changed.length} arquivo(s).`);
} else {
    console.log("Formatação validada com sucesso.");
}
