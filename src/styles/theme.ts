import * as colors from "./colors";
import { shadow } from "./shadow";
import { textSize } from "./textSize";
import { borderRadius } from "./borderRadius";
import { duration } from "./duration";
import { screen } from "./screen";

import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
    palette: {
        ...colors,
    },
    shadow,
    text: textSize,
    borderRadius,
    duration,
    screen,
    spacing: (size) => {
        if (size === "px") return "1px";

        return `${size / 4}rem`;
    },
};
