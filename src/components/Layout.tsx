import { Outlet } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
const Layout = () => {
  return (
    <div className="relative w-full min-h-screen bg-black text-[#C29D54]">
      {/* Fixed background layer */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/assets/Website_Background.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header with profile icon */}
      <header className="absolute top-4 right-4 z-50">
        <ProfileDropdown />
      </header>

      {/* Main scrollable content */}
<main className="relative z-10 w-full min-h-screen text-white">
  <p className="p-4">📍 Inside Layout → Outlet starts below</p>
  <Outlet />
</main>
    </div>
  );
};

export default Layout;