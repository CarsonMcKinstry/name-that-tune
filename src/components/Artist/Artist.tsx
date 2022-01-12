import { Image } from "@packages/graphql";
import { clamp } from "@packages/utils";
import { FC, useMemo } from "react";
import { useArtistQuery } from "./artist.hook";
import artistStyles from "./artist.module.scss";

type ArtistProps = {
  artistId: string;
};

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

export const Artist: FC<ArtistProps> = ({ artistId }) => {
  const { data, loading, error } = useArtistQuery({
    variables: { artistId },
  });

  const artist = useMemo(() => {
    if (loading) return null;

    return data?.artist;
  }, [data, loading]);

  if (!artist) return null;

  const { name, images } = artist;

  const { url = DEFAULT_ARTIST_IMAGE } = getLargestImage(images);

  return (
    <div className="flex items-center p-3">
      <img className="w-12 h-12 rounded-full" src={url} />
      <p className={artistStyles.text}>{name}</p>
    </div>
  );
};

// className="text-slate-50 pl-3 font-medium text-s truncate pr-8"
