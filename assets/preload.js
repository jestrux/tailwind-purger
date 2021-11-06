const hljs = require('highlight.js');
const processor = require("./processor");
const { clipboard } = require('electron');
const cleanCSS = require('clean-css');

window.addEventListener('DOMContentLoaded', () => {
    const paste = document.querySelector("#paste");
    const copy = document.querySelector("#copy");
    const input = document.querySelector("#input");
    const output = document.querySelector("#output");
    let generatedCSS;

    paste.addEventListener("click", async (e) => {
        const value = clipboard.readText();
        input.innerHTML = hljs.highlight(value, {language: 'html'}).value;
        generatedCSS = await processor(value);
        output.innerHTML = hljs.highlight(generatedCSS, {language: 'css'}).value;
    });

    copy.addEventListener("click", async (e) => {
        const minifiedCSS = new cleanCSS({}).minify(generatedCSS).styles;
        clipboard.writeText(minifiedCSS);
        alert("CSS copied to clipboard");
    });
})