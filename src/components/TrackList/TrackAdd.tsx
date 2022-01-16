import { FC } from "react";
import styles from "./trackList.module.scss";

interface TrackAddProps {
    onClick: () => void;
    icon?: string;
}

export const TrackAdd: FC<TrackAddProps> = ({
    onClick,
    icon = "add_circle",
}) => {
    return (
        <button
            className={styles.add}
            onClick={(event) => {
                event.stopPropagation();
                onClick();
            }}
        >
            <span className="material-icons">{icon}</span>
        </button>
    );
};
