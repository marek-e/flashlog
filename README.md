<p align="center">
  <a 
  href="https://raw.githubusercontent.com/marek-e/flashlog/master/icon_rounded.png" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://raw.githubusercontent.com/marek-e/flashlog/master/icon_rounded.png" alt="flashlog logo">
  </a>
</p>
<br/>
<p align="center">
  <a href="https://deepwiki.com/marek-e/flashlog"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
</p>
<br/>

# FlashLog ⚡️

> One-shortcut logging and cleanup — insert smart, language-aware logs instantly, then wipe them out in a flash.

Insert a log/print statement for the current selection (or word/line) with one shortcut. Clean them up just as fast.

- **Insert**: `Ctrl+Alt+L` (Win/Linux) / `Cmd+Alt+L` (macOS)
- **Remove**: `Ctrl+Alt+Shift+L` / `Cmd+Alt+Shift+L`

## Features

- **Smart expression pick**: uses selection; otherwise the word under the cursor; otherwise falls back to the trimmed current line.
- **Language‑aware templates** with `${label}` and `${expr}` placeholders.
- **Label control**: `${name}` placeholder derived from the expression. Optionally prefix with `filename:line`.
- **Insert position**: next line (default) or same line end.
- **Cleanup**: remove any lines containing a configurable marker (default `FLASHLOG`).

## Usage

1. Place the caret or select an expression.
2. Press the insert shortcut. FlashLog inserts an appropriate log/print statement using the active language template.
3. To clean up, run **FlashLog: Remove Logs In File** (or use the remove shortcut).

### Example (manual acceptance)

- **JS/TS**: selecting `user.name` inserts

```js
console.log("file:line user.name:", user.name); // FLASHLOG⚡️
```

## Settings

- `flashlog.insertPosition`: `"nextLine"` or `"sameLineEnd"`.
- `flashlog.includeFileLine`: prefix label with `file:line`.
- `flashlog.labelFormat`: default `"${name}"` (use `${name}` placeholder).
- `flashlog.languageTemplates`: map of `languageId` -> template. Use `${label}` and `${expr}`.
- `flashlog.genericTemplate`: used if languageId is not mapped.
- `flashlog.removePattern`: marker used to find and delete logs.

> Pro tip: Keep `// FLASHLOG⚡️` (or equivalent comment) in your templates so you can bulk-remove them later.
