import type { ReactNode } from 'react'
import './Header.scss'

type HeaderProps = {
    leftChild?: ReactNode,
    title: string,
    rightChild?: ReactNode,
}

const Header = ({leftChild, title, rightChild}: HeaderProps) => {
  return (
    <div className="Header">
        <div className="header_left">{leftChild}</div>
        <div className="header_title">{title}</div>
        <div className="header_right">{rightChild}</div>
    </div>
  )
}

export default Header