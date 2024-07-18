import { useContext } from "react";
import ModuleContext from "context/ModuleContext";

const useModuleContext = () => {
    return useContext(ModuleContext);
}
export default useModuleContext;
