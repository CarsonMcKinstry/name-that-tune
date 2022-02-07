import { AudioPlayer } from "@components/AudioPlayer";
import { GameBoard } from "@components/GameBoard/GameBoard";
import { NextPage } from "next";

const Play: NextPage = () => {
    return (
        <AudioPlayer>
            <GameBoard
                artists={["3Uios5Yyv4i8EBs9H3DUY5", "5LGo1zHegJTWzqVXgeNplt"]}
                tracks={["1sx0XsWUusUoPstbvokZjP", "1BSMpVGWs3v5BZKnAQziAc"]}
                genre="pop"
            />
        </AudioPlayer>
    );
};

export default Play;
