const calculateExp = (level: number): number => {
    let baseExp = 0;
    let multiplier = 0;
    let maxExperience;

    if (level >= 1 && level <= 10) {
        baseExp = 10000;
        multiplier = 2.0;
    } else if (level >= 11 && level <= 25) {
        baseExp = 100000;
        multiplier = 1.5;
    } else if (level >= 26 && level <= 50) {
        baseExp = 1000000;
        multiplier = 1.2;
    } else if (level >= 51 && level <= 75) {
        baseExp = 10000000;
        multiplier = 1.1;
    } else if (level >= 76 && level < 100) {
        baseExp = 100000000;
        multiplier = 1.05;
    } else if (level === 100) {
        baseExp = 130000000;
        multiplier = 1.05;
        maxExperience = calculateExp(101)
    } else {
        // Handle levels beyond 100
        return Infinity;
    }

    let requiredExp = baseExp + Math.pow(multiplier, level - 1);

    return requiredExp;
};
// Calculate total required XP for level 100
// let totalXP = 0;
// for (let level = 1; level <= 100; level++) {
//     totalXP += calculateExp(level);
// }
// console.log("Total XP required to reach level 100:", totalXP);

export { calculateExp }