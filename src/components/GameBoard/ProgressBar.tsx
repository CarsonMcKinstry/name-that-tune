import { FC } from "react";
import cn from "classnames";
import styled from "styled-components";
import { spacing, screen, borderRadius, color } from "@styles/utils";
import {
    progress,
    revealAnimation,
    RevealAnimationProps,
} from "@styles/animations";

interface ProgressBarProps {
    playing: boolean;
}

const Container = styled.div`
    padding: ${spacing(3)};
    width: 100%;
    max-width: 360px;
    justify-self: start;

    @media (min-width: ${screen("tablet")}) {
        padding: 0;
        padding-top: ${spacing(6)};
    }
`;

const BarHousing = styled.div`
    border-radius: ${borderRadius("lg")};
    height: ${spacing(2)};
    width: 100%;
    background-color: ${color("zinc", 500)};
    overflow: hidden;
`;

const Bar = styled.div<RevealAnimationProps>`
    width: 100%;
    height: 100%;
    background-color: ${color("zinc", 100)};
    ${revealAnimation}
`;

export const ProgressBar: FC<ProgressBarProps> = ({ playing }) => {
    return (
        <Container>
            <BarHousing>
                <Bar animation={progress} playing={playing} duration={30} />
            </BarHousing>
        </Container>
    );
};
