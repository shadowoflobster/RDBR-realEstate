import React from "react";
import './Layout.css';

const Layout = ({ children }) =>{
    return (
        <div className="Layout">
             <header className="header">
        {/* The header content or component */}
      </header>
      <main className="main-content">
        {children} {/* This is where the main content will be rendered */}
      </main>
        </div>
    )
}

export default Layout;