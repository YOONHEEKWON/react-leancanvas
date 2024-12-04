import { NavLink, Link } from 'react-router-dom';
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { useState } from 'react';
import Button from './components/Button';

export default function Header() {
  //const navigate = useNavigate();
  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome />, to: '/' },
    { id: 'about', label: 'About', icon: <FaInfoCircle />, to: '/about' },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope />, to: '/contact' },
  ];
  const [isMuneOpen, setisMenuOpen] = useState(false);
  const toggleMenu = () => setisMenuOpen(!isMuneOpen);
  return (
    <header className="sticky top-0 bg-gray-800 text-white px-4 z-30">
      <div className="container mx-auto flex justify-between items-center h-14">
        <h1>
          <Link to="/" className="text-xl font-bold">
            Lean Canvas
          </Link>
        </h1>
        <nav className="hidden md:flex space-x-4">
          {navItems.map(item => (
            <NavLink
              key={item.id}
              to={item.to}
              className="hover:text-gray-300 "
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>
          <FaBars />
        </button>
        <Button className="hidden md:block">GitHub 주소</Button>
      </div>
      {/* Mobile Menu */}
      <aside
        className={`
        fixed top-0 left-0 w-64 h-full bg-gray-800 z-50
        ${isMuneOpen ? 'translate-x-0' : '-translate-x-full'}
        md:hidden transform transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-white focus:outline-none"
            aria-label="Close menu"
            onClick={toggleMenu}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          {navItems.map(item => (
            <NavLink
              key={item.id}
              to={item.to}
              className="hover:text-gray-300 "
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </header>
  );
}
