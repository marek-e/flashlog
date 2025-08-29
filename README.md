# FlashLog ⚡️

Insert a log / print statement for many languages with one shortcut.

- **Shortcut**: `Ctrl+Alt+L` (Windows/Linux), `Ctrl+Alt+L` (macOS)
- **Selection-aware**: If you select `foo.bar`, it logs that expression.
- **Smart label**: Optionally prefixes with `filename:line`.
- **Multi-language**: Configure per-language templates.
- **Cleanup**: `FlashLog: Remove Logs in File` removes inserted logs with the marker.

## Usage

- Place the cursor on an identifier or select an expression.
- Hit the shortcut. A log line is inserted based on your language template.

## Settings

- `flashlog.insertPosition`: `"nextLine"` or `"sameLineEnd"`.
- `flashlog.includeFileLine`: prefix label with `file:line`.
- `flashlog.labelFormat`: default `"${name}"` (use `${name}` placeholder).
- `flashlog.languageTemplates`: map of `languageId` -> template. Use `${label}` and `${expr}`.
- `flashlog.genericTemplate`: used if languageId is not mapped.
- `flashlog.removePattern`: marker used to find and delete logs.

> Pro tip: Keep `// FLASHLOG⚡️` (or equivalent comment) in your templates so you can bulk-remove them later.
