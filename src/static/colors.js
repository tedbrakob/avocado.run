export const colors = new Map(Object.entries(require('./colors.json')));

export const setColorsAsCssVars = () => {

    const root = document.documentElement;

    for (const [name, value] of colors) {
        root.style.setProperty(`--${name}`, value);
    }
};