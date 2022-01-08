export const omitNil = (obj: any) => {
    const out: any = {};

    for (const key in obj) {
        if (obj[key] != null) {
            out[key] = obj[key];
        }
    }

    return out;
};
