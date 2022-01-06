import { Nullable } from "@packages/types";
import { createContext } from "react";

export const authContext = createContext<Nullable<string>>(null);
