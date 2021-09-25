export const setValid = name => {
	document.querySelector(`.error.${name}`).classList.add('hide')
}

export const setError = (name, content) => {
	const el = document.querySelector(`.error.${name}`)
	el.textContent = content
	el.classList.remove('hide')
}

export const isFormUnfilled = fields => {
	let isUnfilled = false

	for (const field in fields) {
		const content = fields[field]

		if (!content) {
			setError(field, `Oops, you have to fill this field`)
			isUnfilled = true
		} else setValid(field)
	}

	return isUnfilled
}
