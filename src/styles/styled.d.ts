// import original module declarations
import "styled-components";

export type Colors =
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose";

export type Value = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type Color = {
    [value in Value]: string;
};

export type Palette = Record<Colors, Color>;

export type Shadows = Record<
    "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "none",
    string
>;

type Text = Record<"xs" | "sm" | "md" | "lg" | "xl" | "xxl", string>;

type BorderRadius = Record<
    "sm" | "base" | "md" | "lg" | "xl" | "full" | "none",
    string
>;

type Duration = Record<75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000, string>;

type SpacingCalculation = (size: "px" | number) => string;

type Screen = Record<
    "tablet" | "laptop" | "desktop" | "wide" | "ultrawide",
    string
>;

// and extend them!
declare module "styled-components" {
    export interface DefaultTheme {
        palette: Palette;
        shadow: Shadows;
        text: Text;
        borderRadius: BorderRadius;
        duration: Duration;
        spacing: SpacingCalculation;
        screen: Screen;
    }
}
