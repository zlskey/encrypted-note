module.exports = (...requirements) => {
	for (element of requirements) {
		if (!element) throw Error('missing args EXERR')
	}
	return true
}
