import { useContext } from "react";
import AdminNavbarContext from "context/AdminNavbarContext";

const useAdminNavbar = () => {
    return useContext(AdminNavbarContext);
}
export default useAdminNavbar;
