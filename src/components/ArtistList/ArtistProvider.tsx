import { FC, useMemo } from "react";
import { useGetArtistQuery } from "./getArtist.hook";
import { artistContext } from "./artistContext";
import { Image } from "@packages/graphql";

const { Provider } = artistContext;

interface ArtistProviderProps {
    artistId: string;
}

const DEFAULT_ARTIST_IMAGE =
    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=PastelGreen02&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Light";

const getLargestImage = (images: Image[]) => {
    if (!images.length) {
        return {
            url: DEFAULT_ARTIST_IMAGE,
            height: 160,
            width: 160,
        };
    }

    let largest = {
        size: 0,
        image: images[0],
    };

    for (const image of images) {
        const { height = 160, width = 160 } = image;

        if (height! * width! > largest.size) {
            largest = {
                size: height! * width!,
                image,
            };
        }
    }

    return largest.image;
};

export const ArtistProvider: FC<ArtistProviderProps> = ({
    artistId,
    children,
}) => {
    const { data } = useGetArtistQuery({ variables: { artistId } });

    const { artist } = data ?? {};

    if (!artist) return null;

    const { name, images } = artist;

    const image = getLargestImage(images);

    return (
        <Provider
            value={{
                name,
                image,
            }}
        >
            {children}
        </Provider>
    );
};
