import LOGO from "../assets/LOGO.png";
import profileImg from "../assets/profile.svg";

const Navbar = () => {
  return (
    <div>
      <nav className="max_padd_container_No flexBetween bg-white py-2 ring-1 ring-slate-900/5">
        <div className="flex items-center">
          <img src={LOGO} alt="logo" width={50} />
          <h3 className="font-bold">Shoptopia</h3>
        </div>
        <div className="uppercase bold-22 text-white bg-secondary px-3 rounded-md tracking-widest line-clamp-1 max-xs:bold-18 max-xs:py-2 max-xs:px-1">
          Admin Panel
        </div>
        <div>
          <img
            src={profileImg}
            alt="Profile-image"
            className="h-12 w-12 rounded-full"
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
