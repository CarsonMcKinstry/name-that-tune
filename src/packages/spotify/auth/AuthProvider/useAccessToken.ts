import { useContext } from "react";
import { authContext } from "./authContext";

export const useAccessToken = () => {
    const accessToken = useContext(authContext);

    return accessToken;
};
