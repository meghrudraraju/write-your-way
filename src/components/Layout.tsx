import { Outlet } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const Layout = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-[#C29D54]">
      {/* Header with profile icon */}
      <header className="absolute top-4 right-4 z-50">
        <ProfileDropdown />
      </header>

      {/* Main content area */}
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
