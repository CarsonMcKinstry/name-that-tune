import { useEffect, useRef } from "react";
interface Options {
    interval: number;
    onTick?: () => void;
}

export const useTimer = (options: Options) => {
    const timerRef = useRef<NodeJS.Timeout>();

    function start() {
        stop();

        timerRef.current = setInterval(() => {
            options.onTick?.();
        }, options.interval);
    }

    function stop() {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }

    return [start, stop] as const;
};
