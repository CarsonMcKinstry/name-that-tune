import {
    reveal,
    revealAnimation,
    RevealAnimationProps,
} from "@styles/animations";
import { borderRadius, screen, spacing } from "@styles/utils";
import cn from "classnames";
import { FC } from "react";
import styled from "styled-components";

interface GameAlbumArtworkProps {
    onLoad?: () => void;
    playing: boolean;
    url: string;
}

const Container = styled.div`
    width: 100%;
    padding: 0 ${spacing(3)};

    display: flex;
    justify-content: center;
    max-width: 340px;

    @media (min-width: ${screen("tablet")}) {
        padding: 0;
    }
`;

const Artwork = styled.img<RevealAnimationProps>`
    width: 100%;
    border-radius: ${borderRadius("lg")};
    ${revealAnimation}
`;

export const AlbumArtwork: FC<GameAlbumArtworkProps> = ({
    onLoad,
    playing,
    url,
}) => {
    return (
        <Container>
            <Artwork
                onLoad={onLoad}
                src={url}
                alt="album artwork slowly revealing itself"
                duration={30}
                animation={reveal}
                playing={playing}
            />
        </Container>
    );
};
