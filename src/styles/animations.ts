import { css, Keyframes, keyframes } from "styled-components";

export const reveal = keyframes`
    from {
        filter: blur(2em);
    }
    to {
        filter: blur(0);
    }
`;

export const progress = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
`;

export interface RevealAnimationProps {
    animation: Keyframes;
    duration: number;
    playing: boolean;
}

export const revealAnimation = css<RevealAnimationProps>`
    animation-direction: forwards;
    animation-timing-function: linear;
    animation-play-state: ${({ playing = false }) =>
        playing ? "running" : "paused"};
    animation-duration: ${({ duration = 30 }) => duration}s;
    animation-name: ${({ animation }) => animation};
`;
