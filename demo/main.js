import * as Keycode from '../lib/index.js';

const KEY_DISPLAY = document.querySelector('.js-key-display');
const PROPERTIES = document.querySelector('.js-properties');
const MODIFIERS = document.querySelector('.js-modifiers');
const TABLE_BODY = document.querySelector('.js-table-body');
const TABLE_SEARCH = document.querySelector('.js-table-search');

const LOCATION_LABELS = {
	0: 'Standard',
	1: 'Left',
	2: 'Right',
	3: 'Numpad',
};

const keycodeToName = Object.fromEntries(
	Object.entries(Keycode).map(([name, code]) => [code, name]),
);

const REFERENCE_ROWS = Object.entries(Keycode)
	.map(([name, code]) => ({
		name,
		code,
		key: keyLabelForCode(code),
		eventCode: eventCodeForConstant(name),
	}))
	.sort((a, b) => a.code - b.code);

function keyLabelForCode(code) {
	const labels = {
		[Keycode.SPACE]: 'Space',
		[Keycode.ARROW_LEFT]: '←',
		[Keycode.ARROW_UP]: '↑',
		[Keycode.ARROW_RIGHT]: '→',
		[Keycode.ARROW_DOWN]: '↓',
	};

	return labels[code] ?? keycodeToName[code] ?? String(code);
}

function eventCodeForConstant(name) {
	const codes = {
		BACKSPACE: 'Backspace',
		TAB: 'Tab',
		ENTER: 'Enter',
		SHIFT: 'ShiftLeft',
		ESCAPE: 'Escape',
		SPACE: 'Space',
		PAGE_UP: 'PageUp',
		PAGE_DOWN: 'PageDown',
		END: 'End',
		HOME: 'Home',
		ARROW_LEFT: 'ArrowLeft',
		ARROW_UP: 'ArrowUp',
		ARROW_RIGHT: 'ArrowRight',
		ARROW_DOWN: 'ArrowDown',
		DELETE: 'Delete',
	};

	return codes[name] ?? '—';
}

function displayKey(event) {
	if (event.key === ' ') return 'Space';
	if (event.key.length === 1) return event.key.toUpperCase();

	const symbols = {
		ArrowLeft: '←',
		ArrowUp: '↑',
		ArrowRight: '→',
		ArrowDown: '↓',
	};

	return symbols[event.key] ?? event.key;
}

function renderProperties(event) {
	const constant = keycodeToName[event.keyCode];
	const location = LOCATION_LABELS[event.location] ?? String(event.location);

	const rows = [
		['event.key', event.key],
		['event.code', event.code],
		['event.keyCode', String(event.keyCode)],
		['event.which', String(event.which)],
		['event.location', `${event.location} (${location})`],
		['@19h47/keycode', constant ?? '—'],
	];

	PROPERTIES.innerHTML = rows
		.map(
			([label, value]) => `
				<div class="KeycodeProperty">
					<dt class="KeycodeProperty-label">${label}</dt>
					<dd class="KeycodeProperty-value"><code>${escapeHtml(value)}</code></dd>
				</div>
			`,
		)
		.join('');
}

function renderModifiers(event) {
	const modifiers = [
		['Shift', event.shiftKey],
		['Ctrl', event.ctrlKey],
		['Alt', event.altKey],
		['Meta', event.metaKey],
	];

	MODIFIERS.innerHTML = modifiers
		.map(
			([name, active]) => `
				<span class="KeycodeModifier${active ? ' is-active' : ''}">${name}</span>
			`,
		)
		.join('');
}

function renderTable(filter = '') {
	const query = filter.trim().toLowerCase();

	TABLE_BODY.innerHTML = REFERENCE_ROWS.filter((row) => {
		if (!query) return true;

		return (
			row.name.toLowerCase().includes(query) ||
			String(row.code).includes(query) ||
			row.key.toLowerCase().includes(query) ||
			row.eventCode.toLowerCase().includes(query)
		);
	})
		.map(
			(row) => `
				<tr>
					<th scope="row"><code>${row.name}</code></th>
					<td><code>${row.code}</code></td>
					<td><code>${escapeHtml(row.key)}</code></td>
					<td><code>${row.eventCode}</code></td>
				</tr>
			`,
		)
		.join('');
}

function escapeHtml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function handleKeyEvent(event) {
	if (event.metaKey && ['r', 'R'].includes(event.key)) return;

	KEY_DISPLAY.textContent = displayKey(event);
	KEY_DISPLAY.classList.add('is-active');
	renderProperties(event);
	renderModifiers(event);
}

document.addEventListener('keydown', handleKeyEvent);
document.addEventListener('keyup', (event) => {
	renderModifiers(event);
});

TABLE_SEARCH?.addEventListener('input', (event) => {
	renderTable(event.target.value);
});

renderTable();
