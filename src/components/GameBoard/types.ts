export interface RoundTrack {
    id: string;
    name: string;
    album: string;
    artist: string;
}

export interface RoundData {
    track: RoundTrack & {
        preview: string;
        albumArtwork: string;
    };
    options: RoundTrack[];
}

export interface GameInput {
    artists: [string] | [string, string];
    tracks: [string] | [string, string];
    genre: string;
}
