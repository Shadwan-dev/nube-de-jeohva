import React from 'react';

const NavItem = ({ href, children, isActive = false, icon = null }) => {
  return (
    <li className="nav-item">
      <a 
        href={href} 
        className={`
          flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200
          ${isActive 
            ? 'bg-white/10 text-white font-semibold' 
            : 'text-cyan-100 hover:bg-white/5 hover:text-white'
          }
        `}
      >
        {icon && <span className="nav-icon">{icon}</span>}
        <span className="nav-text">{children}</span>
      </a>
    </li>
  );
};

export default NavItem;