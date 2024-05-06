import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = [
    {
      id: 1,
      text: "Home",
      path: "/",
    },
  ];

  return (
    <nav>
      <ul>
        {links.map((link) => {
          return (
            <li key={link.id}>
              <NavLink to={link.path}>
                {link.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Navbar;
