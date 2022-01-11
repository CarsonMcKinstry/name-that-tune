import { Artist, Image } from "@packages/graphql";
import { clamp } from "@packages/utils";
import { FC } from "react";

type ArtistPortraitProps = Pick<Artist, "id" | "name" | "images">;

const DEFAULT_ARTIST_IMAGE = 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=PastelGreen02&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Light';

const artistImageClamp = clamp(160);

const getLargestImage = (images: Image[]) => {

    if (!images.length) {
        return {
            url: DEFAULT_ARTIST_IMAGE,
            height: 160,
            width: 160
        }
    }

    let largest = {
        size: 0,
        image: images[0]
    };

    for (const image of images) {
        const { height = 160, width = 160 } = image; 

        if (height!*width! > largest.size) {
            largest = {
                size: height! * width!,
                image
            }
        }
    }

    return largest.image;
}

export const ArtistPortrait: FC<ArtistPortraitProps> = ({ name, images }) => {

    const { url = DEFAULT_ARTIST_IMAGE, height = 160, width = 160} = getLargestImage(images);

    return (
        <div>
            <img src={url} height={artistImageClamp(height!)} width={artistImageClamp(width!)} />
            <p>{name}</p>
        </div>
    )
}