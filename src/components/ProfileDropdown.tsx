import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Add logout logic here (e.g., clear tokens, call API, etc.)
    console.log("Logged out");
    navigate("/auth");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile icon */}
      <img
        src="/assets/Profile_Icon.svg"
        alt="Profile"
        className="w-10 h-10 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-black border border-[#C29D54] rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              navigate("/edit-profile");
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-[#C29D54]/20 text-[#C29D54]"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left hover:bg-[#C29D54]/20 text-[#C29D54]"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
