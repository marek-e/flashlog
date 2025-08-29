# Log Anywhere

Insert a log / print statement for many languages with one shortcut.

- **Shortcut**: `Ctrl+Alt+L` (Windows/Linux), `Cmd+Alt+L` (macOS)
- **Selection-aware**: If you select `foo.bar`, it logs that expression.
- **Smart label**: Optionally prefixes with `filename:line`.
- **Multi-language**: Configure per-language templates.
- **Cleanup**: `Log Anywhere: Remove Logs in File` removes inserted logs with the marker.

## Usage
- Place the cursor on an identifier or select an expression.
- Hit the shortcut. A log line is inserted based on your language template.

## Settings
- `logAnywhere.insertPosition`: `"nextLine"` or `"sameLineEnd"`.
- `logAnywhere.includeFileLine`: prefix label with `file:line`.
- `logAnywhere.labelFormat`: default `"${name}"` (use `${name}` placeholder).
- `logAnywhere.languageTemplates`: map of `languageId` -> template. Use `${label}` and `${expr}`.
- `logAnywhere.genericTemplate`: used if languageId is not mapped.
- `logAnywhere.removePattern`: marker used to find and delete logs.

> Pro tip: Keep `// LOG_ANYWHERE` (or equivalent comment) in your templates so you can bulk-remove them later.
