import { useContext } from "react";

import LogContext from "../context/LogProvider";

const useLogContext = () =>
{
    return useContext(LogContext);
}
export default useLogContext;
