import colorsMap from './colors.json';

export const colors = new Map(Object.entries(colorsMap));

export const setColorsAsCssVars = () => {
    const root = document.documentElement;

    for (const [name, value] of colors) {
        root.style.setProperty(`--${name}`, value);
    }
};