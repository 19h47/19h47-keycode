[![](https://img.shields.io/npm/v/@19h47/keycode)](https://www.npmjs.com/package/@19h47/keycode)
[![](https://img.shields.io/npm/dm/@19h47/keycode)](https://www.npmjs.com/package/@19h47/keycode)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/19h47/19h47-keycode)

# @19h47/keycode

Named constants for legacy [`KeyboardEvent.keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) values. Import `ENTER` instead of comparing against `13` — six months later, you still know what the handler checks for.

## When to use

- A codebase or library still branches on `event.keyCode` / `event.which`.
- You want shared, grep-friendly names across keyboard handlers (`ESCAPE`, `ARROW_DOWN`, …).
- You debug keyboard behaviour and want readable comparisons in DevTools or tests.

## When not to use

- New code should prefer [`event.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) and [`event.code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code). They are layout-aware and not deprecated.
- You need every key on the keyboard. This package only exports the navigation and editing keys used most often in UI widgets.

## Installation

```bash
pnpm add @19h47/keycode
```

Also works with `npm` / `yarn` / `bun`.

## Usage

```js
import { ENTER, ESCAPE, ARROW_DOWN, ARROW_UP } from '@19h47/keycode';

document.addEventListener('keydown', (event) => {
	if (event.keyCode === ESCAPE) {
		closeDialog();
	}

	if (event.keyCode === ENTER) {
		submitForm();
	}

	if (event.keyCode === ARROW_DOWN || event.keyCode === ARROW_UP) {
		moveFocus(event.keyCode === ARROW_DOWN ? 1 : -1);
	}
});
```

Named imports only — no default export, no runtime logic.

### UMD

```html
<script src="node_modules/@19h47/keycode/dist/keycode.umd.cjs"></script>
<script>
	document.addEventListener('keydown', (event) => {
		if (event.keyCode === keycode.ESCAPE) {
			// …
		}
	});
</script>
```

## Constants

| Constant | `keyCode` | Typical `event.key` | Typical `event.code` |
| --- | ---: | --- | --- |
| `BACKSPACE` | 8 | `Backspace` | `Backspace` |
| `TAB` | 9 | `Tab` | `Tab` |
| `ENTER` | 13 | `Enter` | `Enter` |
| `SHIFT` | 16 | `Shift` | `ShiftLeft` |
| `ESCAPE` | 27 | `Escape` | `Escape` |
| `SPACE` | 32 | ` ` | `Space` |
| `PAGE_UP` | 33 | `PageUp` | `PageUp` |
| `PAGE_DOWN` | 34 | `PageDown` | `PageDown` |
| `END` | 35 | `End` | `End` |
| `HOME` | 36 | `Home` | `Home` |
| `ARROW_LEFT` | 37 | `ArrowLeft` | `ArrowLeft` |
| `ARROW_UP` | 38 | `ArrowUp` | `ArrowUp` |
| `ARROW_RIGHT` | 39 | `ArrowRight` | `ArrowRight` |
| `ARROW_DOWN` | 40 | `ArrowDown` | `ArrowDown` |
| `DELETE` | 46 | `Delete` | `Delete` |

## Development

```bash
pnpm install
pnpm dev      # Vite playground
pnpm build    # library build → dist/ + docs/
```

## Demo

Live example: [19h47.github.io/19h47-keycode](https://19h47.github.io/19h47-keycode/) · [source](./docs/index.html)

Press any key to inspect `event.key`, `event.code`, `event.keyCode`, and the matching `@19h47/keycode` constant.

## References

- [`KeyboardEvent.keyCode` on MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) (deprecated)
- [`KeyboardEvent.key` on MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
- [`KeyboardEvent.code` on MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
