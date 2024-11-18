import './Navbar.css'
// @ts-ignore
import logo from '../../assets/logo3x.png'
import React from 'react'

export function Navbar() {
  return (
    <nav className="navbar">
      <img
        src={logo}
        alt="Logo escrito 'Marvel Search heroes', a palavra marvel está em vermelho e o restante em cinza escuro."
        loading="lazy"
        className="logo"
      />
    </nav>
  )
}
