import { FC, createContext, useContext, useState } from "react";

interface State {
    initial: keyof this["steps"];
    steps: {
        [state: string]: string[];
    };
}

export const createSteps = <S extends State>(steps: S) => {
    const stepState = createContext<keyof S["steps"]>(steps.initial);

    const Steps: FC<{ state: keyof S["steps"] }> = ({ children, state }) => (
        <stepState.Provider value={state}>{children}</stepState.Provider>
    );

    const Step: FC<{ step: keyof S["steps"] }> = ({ children, step }) => {
        const currentStep = useContext(stepState);
        if (step !== currentStep) return null;

        return <>{children}</>;
    };

    const useSteps = () => {
        const [currentStep, setCurrentStep] = useState<keyof S["steps"]>(
            steps.initial
        );

        function transition(n: keyof S["steps"]) {
            // @ts-ignore
            const possibleStates = steps.steps[currentStep];

            if (!possibleStates.includes(n))
                throw new Error("Impossible State");

            setCurrentStep(n);
        }

        return [currentStep, transition] as const;
    };

    return [Steps, Step, useSteps] as const;
};
