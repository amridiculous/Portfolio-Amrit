import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const NavBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 52px;
  background: ${({ $scrolled }) =>
    $scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.72)'};
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid
    ${({ $scrolled, theme }) => ($scrolled ? theme.colors.border : 'transparent')};
  transition: border-color 0.3s ease, background 0.3s ease;
`

export const Inner = styled.div`
  max-width: 980px;
  margin: 0 auto;
  height: 100%;
  padding: 0 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const LogoLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.022em;
  color: ${({ theme }) => theme.colors.text};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.65;
  }
`

export const Links = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

export const NavLinkItem = styled(Link)`
  font-size: 13px;
  letter-spacing: 0.01em;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text : theme.colors.textSecondary};
  font-weight: ${({ $active }) => ($active ? '500' : '400')};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

export const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 20px;
  height: 14px;
  background: none;
  border: none;
  padding: 0;

  span {
    display: block;
    width: 100%;
    height: 1.5px;
    background-color: ${({ theme }) => theme.colors.text};
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`

export const MobileNav = styled.div`
  position: fixed;
  top: 52px;
  left: 0;
  right: 0;
  z-index: 999;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 22px 20px;
  display: flex;
  flex-direction: column;
`

export const MobileLinkItem = styled(Link)`
  font-size: 17px;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text : theme.colors.textSecondary};
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  letter-spacing: -0.01em;

  &:last-child {
    border-bottom: none;
  }
`
