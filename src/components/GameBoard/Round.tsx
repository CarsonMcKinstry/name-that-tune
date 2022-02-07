import { FC } from "react";

export const Round: FC = ({ children }) => {
    return (
        <section className="flex flex-col items-center justify-between h-full w-full">
            {children}
        </section>
    );
};
