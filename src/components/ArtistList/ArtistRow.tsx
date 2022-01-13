import { FC } from "react";
import styles from "./artistList.module.scss";

interface ArtistRowProps {
    artistId: string;
}

import { ArtistProvider } from "./ArtistProvider";

export const ArtistRow: FC<ArtistRowProps> = ({ children, artistId }) => {
    return (
        <li className={styles.artistRow}>
            <ArtistProvider artistId={artistId}>{children}</ArtistProvider>
        </li>
    );
};
