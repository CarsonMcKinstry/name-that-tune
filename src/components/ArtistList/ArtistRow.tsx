import { FC } from "react";
import styles from "./artistList.module.scss";

interface ArtistRowProps {
    artistId: string;
    onClick?: (artistId: string) => void;
}

import { ArtistProvider } from "./ArtistProvider";

export const ArtistRow: FC<ArtistRowProps> = ({
    children,
    artistId,
    onClick,
}) => {
    return (
        <ArtistProvider artistId={artistId}>
            <li>
                <button
                    onClick={() => {
                        onClick && onClick(artistId);
                    }}
                    className={styles.artistRow}
                >
                    {children}
                </button>
            </li>
        </ArtistProvider>
    );
};
