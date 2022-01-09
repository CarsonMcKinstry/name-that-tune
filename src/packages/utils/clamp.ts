export const clamp =
    (min: number, max: number = min) =>
    (n: number) => {
        if (n < min) return min;
        if (n > max) return max;
        return n;
    };
