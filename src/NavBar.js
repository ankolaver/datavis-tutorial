import React, { useState } from 'react';

export const NavBar = () => {
    
    const [isActive, setisActive] = useState(false);

    return (
    <>
    <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_532570.png&f=1&nofb=1" width="25" height="50"/>
        <h1 class="title has-text-centered">DataVis-Tutorial</h1>
      </a>
      <a 
        id="collapse-burger" 
        role="button" 
        class="burger navbar-burger" 
        aria-label="menu"
        aria-expanded="false" 
        onClick={() => {
          setisActive(!isActive);
        }}
        className={`navbar-burger burger is-dark ${isActive ? "is-active" : ""}`}
        data-target="navMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  
    <div class="navbar-menu" id="navMenu" className={`navbar-menu is-dark ${isActive ? "is-active" : ""}`}>
      <div class="navbar-start">
        <a class="navbar-item" href="#">
          Country Population Example
        </a>
        <a class="navbar-item" href="#flowerscatter">
          Flower Analysis
        </a>
        <a class="navbar-item" href="#stock">
          Stock Graphs
        </a>
        
      </div>
  
      <div class="navbar-end">
        <div class="navbar-item buttons">
            <a class="button is-primary" href="https://www.youtube.com/watch?v=2LhoCfjm8R4">
              <strong>Curran's Tutorial</strong>
            </a>
            <a class="button is-dark" href="https://github.com/ankolaver/datavis-tutorial">
              <img src="https://maxcdn.icons8.com/Share/icon/nolan/logos/github1600.png" width="25" height="50"/>
              Github
            </a>
        </div>
      </div>

    </div>
    </nav>
  </>
  )
};