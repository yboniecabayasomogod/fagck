import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white text-gray-800 px-6 py-4 flex justify-between items-center shadow-md">
      <Link className="text-xl font-bold" to="/">FAGCK</Link>
      <div className="flex gap-6">
        <Link className="hover:underline" to="/">Home</Link>
        <Link className="hover:underline" to="/MissionVisionPage">Mission & Vision</Link>
        <Link className="hover:underline" to="/AddMemberPage">Add Members</Link>
        <Link className="hover:underline" to="/MembersPage">Members Page</Link>
        <Link className="hover:underline" to="/EditMemberPage">Edit Members</Link>
        {/* Add more nav links here */}
      </div>
    </nav>
  );
};

export default Navbar;