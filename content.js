function focus() {
	// get all input elements, excluding invisible elements and non-text fields
	const input = Array.from(document.querySelectorAll('input')).filter(x => x.offsetWidth > 0 && x.offsetHeight > 0 && ['email', 'date', 'datetime-local', 'number', 'password', 'search', 'tel', 'text', 'time', 'url'].includes(x.type));
	let search;

	// 1 and 0 inputs cases
	if (input.length === 1) {
		input[0].focus();
		console.debug('1 focused ', input[0])
		return;
	}

	if (input.length) {
		// type === 'search'
		search = input.filter(x => x.type === 'search');

		// id === 'search'
		if (!search.length) search = input.filter(x => x.id === 'search');

		// id contains 'search'
		if (!search.length) search = input.filter(x => x.id.toLowerCase().indexOf('search') !== -1);

		// classes contain 'search'
		if (!search.length) search = input.filter(x => x.className.toLowerCase().indexOf('search') !== -1);

		// outerHTML contains 'search'
		if (!search.length) search = input.filter(x => x.outerHTML.toLowerCase().indexOf('search') !== -1);

		// parents' ids contain 'search'
		if (!search.length) search = input.filter(x => {
			do {
				x = x.parentElement;
				if (x.id.toLowerCase().indexOf('search') !== -1) return true;
			} while (x.parentElement !== document.body)
			return false;
		});

		// if something found, focus
		if (search.length) {
			// activate first (random) element in input (if exists)
			search.sort((x, y) => x.childElementCount < y.childElementCount ? -1 : 1);
			search[0].focus();
			console.debug('focused ', search[0])
			return;
		}
	}

	// look for non-input elements
	let inputAll = Array.from(document.querySelectorAll('*')).filter(x => x.offsetWidth > 0 && x.offsetHeight > 0);

	// non-input elements, id === 'search'
	search = inputAll.filter(x => x.id === 'search');

	// non-input elements, id contains 'search'
	if (!search.length) search = inputAll.filter(x => x.id.toLowerCase().indexOf('search') !== -1);

	// non-input elements, classes contains 'search'
	if (!search.length) search = inputAll.filter(x => x.className.toLowerCase().indexOf('search') !== -1);

	// non-input elements, outerHTML contains 'search'
	if (!search.length) search = inputAll.filter(x => x.outerHTML.toLowerCase().indexOf('search') !== -1);

	// click first (random) element in input (if exists)
	if (search.length) {
		//sort search array
		search.sort((x, y) => x.childElementCount < y.childElementCount ? -1 : 1);
		search[0].click();
		console.debug('clicked ', search[0])

	}
}