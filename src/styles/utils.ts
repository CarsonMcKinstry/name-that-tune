import { DefaultTheme } from "styled-components";
import {
    BorderRadius,
    Color,
    Colors,
    Duration,
    Shadows,
    Text,
    Screen,
} from "./styled";

type StyleUtil = ({ theme }: { theme: DefaultTheme }) => string;

export const color =
    (c: Colors, value: keyof Color): StyleUtil =>
    ({ theme }) =>
        theme.palette[c][value];

export const shadow =
    (value: keyof Shadows): StyleUtil =>
    ({ theme }) =>
        theme.shadow[value];

export const spacing =
    (value: "px" | number): StyleUtil =>
    ({ theme }) =>
        theme.spacing(value);

export const text =
    (size: keyof Text): StyleUtil =>
    ({ theme }) =>
        theme.text[size];

export const borderRadius =
    (size: keyof BorderRadius): StyleUtil =>
    ({ theme }) =>
        theme.borderRadius[size];

export const screen =
    (size: keyof Screen): StyleUtil =>
    ({ theme }) =>
        theme.screen[size];

export const duration =
    (length: keyof Duration): StyleUtil =>
    ({ theme }) =>
        theme.duration[length];
