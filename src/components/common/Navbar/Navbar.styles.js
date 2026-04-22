import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const NavBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 64px;
  background: transparent;
  transition: background 0.3s ease;
`

export const Inner = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 24px;
  }
`

export const LogoLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.base};
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.045em;
  line-height: 1;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.6;
  }
`

export const Links = styled.nav`
  display: flex;
  align-items: center;
  gap: 44px;
  margin-left: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

export const NavLinkItem = styled(Link)`
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.55;
  }
`

export const NavSocials = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 28px;
  padding-left: 28px;
  border-left: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

export const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`

export const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 20px;
  height: 13px;
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
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  background: ${({ theme }) => theme.colors.bg};
  padding: 8px 24px 40px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`

export const MobileLinkItem = styled(Link)`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  letter-spacing: -0.01em;

  &:last-child {
    border-bottom: none;
  }
`
