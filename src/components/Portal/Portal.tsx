import { createPortal } from "react-dom";
import { FC, useLayoutEffect, useRef, useState } from "react";

export const Portal: FC = ({ children }) => {
    const [portal, setPortal] = useState<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (!portal) {
            const el = document.createElement("div");
            el.classList.add("w-full", "h-full", "absolute", "top-0", "left-0");
            setPortal(el);
        }
    }, [portal]);

    useLayoutEffect(() => {
        if (portal) {
            document.body.appendChild(portal!);
        }

        return () => {
            if (portal) {
                document.body.removeChild(portal!);
            }
        };
    }, [portal]);

    if (!portal) return null;

    return createPortal(<>{children}</>, portal);
};
