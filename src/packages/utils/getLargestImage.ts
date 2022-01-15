import { Image } from "@packages/graphql";

const DEFAULT_IMAGE =
    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=PastelGreen02&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Light";

export const getLargestImage = (images: Image[]) => {
    if (!images.length) {
        return {
            url: DEFAULT_IMAGE,
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
