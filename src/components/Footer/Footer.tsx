import './Footer.css'
import React from 'react'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <p>Marvel ⓒ {year}. Todos os direitos reservados.</p>
    </footer>
  )
}
