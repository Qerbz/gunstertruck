/**
 * evaluates quality of gunster
 * @param {float} guinness - Part of the drink which is guinness - from 0 to 1.
 * @param {float} mix - Degree to which the drink is mixed - from 0 (not mixed) to 1 (completely mixed).
 * @returns {int} - Quality of gunster - from 1 to 10.
 */
function evaluateGunster(guinness){
    return Math.max(-1,(((0.5 - Math.abs(guinness - 0.5)) * 2)-0.75)*4);
}
export default function evaluateGunsterParts(gunsterParts){
    let guinness = 0;
    let monster = 0;
    gunsterParts.forEach(gunsterPart => {
        if (gunsterPart.type === "guinness") guinness += gunsterPart.y;
        if (gunsterPart.type === "monster") monster += gunsterPart.y;
    });
    if (guinness === 0 && monster === 0) return -1;
    let quality = evaluateGunster(guinness/(guinness+monster));
    console.log(quality);
    return quality
}