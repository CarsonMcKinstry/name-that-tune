import { Artist, Image } from "@packages/graphql";
import { clamp } from "@packages/utils";
import { FC } from "react";

type ArtistPortraitProps = Pick<Artist, "id" | "name" | "images">;

const DEFAULT_ARTIST_IMAGE = 'https://placeimg.com/160/160/peopl"'

const artistImageClamp = clamp(160);

const getLargestImage = (images: Image[]) => {
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