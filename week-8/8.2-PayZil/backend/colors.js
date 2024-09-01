function generateColor(){
    const colors = ["slate", "red", "orange", "amber", "lime", "green", "teal", "cyan", "blue", "indigo", "purple", "fuschia", "pink", "rose"];
    const length = colors.length-1;
    let idx = Math.round(Math.random()*length);
    return colors[idx];
}

module.exports = generateColor;