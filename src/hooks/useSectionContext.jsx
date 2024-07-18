import { useContext } from "react";
import SectionContext from "context/SectionContext";

const useSectionContext = () => {
    return useContext(SectionContext);
}
export default useSectionContext;
