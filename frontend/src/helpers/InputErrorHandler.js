export const setValid = name => {
    document.querySelector(`.error.${name}`).classList.add('hide')
}

export const setError = (name, content) => {
    const el = document.querySelector(`.error.${name}`)
    el.textContent = content
    el.classList.remove('hide')
}
