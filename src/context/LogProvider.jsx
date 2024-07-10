import { createContext } from "react";

const LogContext = createContext({});

export const LogProvider = ( {children} ) =>
{
    const development = import.meta.env.MODE === 'development';

    return (
        <LogContext.Provider value={{ development }}>
            {children}
        </LogContext.Provider>
    )
}
export default LogContext;