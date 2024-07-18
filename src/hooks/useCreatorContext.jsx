import { useContext } from "react";
import CreatorContext from "context/CreatorContext";

const useCreatorContext = () => {
    return useContext(CreatorContext);
}
export default useCreatorContext;
