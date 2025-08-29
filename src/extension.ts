import * as vscode from "vscode";

type Templates = Record<string, string>;

function getConfig<T = unknown>(key: string, defaultValue: T): T {
  return vscode.workspace
    .getConfiguration("flashlog")
    .get<T>(key, defaultValue);
}

function languageIdAlias(langId: string): string {
  // Normalize some common aliases
  if (langId === "javascriptreact" || langId === "typescriptreact")
    return "javascript";
  if (langId === "rust") return "rust";
  if (langId === "cpp") return "cpp";
  return langId;
}

function buildLabel(
  doc: vscode.TextDocument,
  pos: vscode.Position,
  name: string | null
): string {
  const includeFileLine = getConfig<boolean>("includeFileLine", true);
  const labelFormat = getConfig<string>("labelFormat", "${name}");
  const file = doc.fileName.split(/[\\/]/).pop() ?? "file";
  const line = pos.line + 1;

  const base = labelFormat.replace("${name}", name ?? "value");
  return includeFileLine ? `${file}:${line} ${base}` : base;
}

function getSelectedExpression(editor: vscode.TextEditor): {
  expr: string;
  name: string | null;
} {
  const sel = editor.selection;
  const doc = editor.document;

  if (!sel.isEmpty) {
    const text = doc.getText(sel).trim();
    // Try to derive a reasonable name (identifier) from selection
    const m = text.match(/[A-Za-z_][\w.]*/);
    return { expr: text, name: m ? m[0] : text.length < 24 ? text : "value" };
  }

  // No selection: try to capture the word under cursor
  const wordRange = doc.getWordRangeAtPosition(sel.active, /[A-Za-z_][\w.]*/);
  if (wordRange) {
    const text = doc.getText(wordRange);
    return { expr: text, name: text };
  }

  // Fallback: entire line trimmed (safe-ish generic)
  const lineText = doc.lineAt(sel.active.line).text.trim();
  return { expr: lineText || "value", name: null };
}

function getTemplateForLanguage(langId: string): string {
  const templates = getConfig<Templates>("languageTemplates", {} as Templates);
  const normalized = languageIdAlias(langId);
  return (
    templates[normalized] ??
    getConfig<string>("genericTemplate", "// ${label}: ${expr} // FLASHLOG⚡️")
  );
}

function insertPosition(): "nextLine" | "sameLineEnd" {
  return getConfig<"nextLine" | "sameLineEnd">("insertPosition", "nextLine");
}

function makeLogLine(template: string, label: string, expr: string): string {
  return template.replace(/\$\{label\}/g, label).replace(/\$\{expr\}/g, expr);
}

async function insertLog() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const doc = editor.document;
  const langId = doc.languageId;
  const template = getTemplateForLanguage(langId);
  const { expr, name } = getSelectedExpression(editor);
  const label = buildLabel(doc, editor.selection.active, name);
  const logLine = makeLogLine(template, label, expr);

  await editor.edit((builder) => {
    const posType = insertPosition();
    if (posType === "sameLineEnd") {
      const line = doc.lineAt(editor.selection.active.line);
      builder.insert(
        line.range.end,
        (line.text.trim().length ? " " : "") + logLine
      );
    } else {
      const line = doc.lineAt(editor.selection.active.line);
      builder.insert(
        new vscode.Position(line.lineNumber + 1, 0),
        logLine + "\n"
      );
    }
  });
}

async function removeLogsInFile() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
  const doc = editor.document;
  const marker = getConfig<string>("removePattern", "FLASHLOG⚡️");

  const edits: vscode.TextEdit[] = [];
  for (let i = 0; i < doc.lineCount; i++) {
    const line = doc.lineAt(i);
    if (line.text.includes(marker)) {
      edits.push(vscode.TextEdit.delete(line.rangeIncludingLineBreak));
    }
  }

  if (edits.length === 0) {
    vscode.window.showInformationMessage("FlashLog: no marked logs found.");
    return;
  }

  const wsEdit = new vscode.WorkspaceEdit();
  wsEdit.set(doc.uri, edits);
  await vscode.workspace.applyEdit(wsEdit);
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("flashlog.insertLog", insertLog),
    vscode.commands.registerCommand("flashlog.removeLogs", removeLogsInFile)
  );
}

export function deactivate() {}
