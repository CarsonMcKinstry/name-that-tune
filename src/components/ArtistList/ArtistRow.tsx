import { FC } from "react";

interface ArtistRowProps {
    artistId: string;
}

import { ArtistProvider } from "./ArtistProvider";

export const ArtistRow: FC<ArtistRowProps> = ({ children, artistId }) => {
    return (
        <li>
            <ArtistProvider artistId={artistId}>{children}</ArtistProvider>
        </li>
    );
};
