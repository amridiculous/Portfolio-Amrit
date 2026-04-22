import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.bg};
`

export const Hero = styled.section`
  min-height: 100vh;
  min-height: 100dvh;
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 100dvh;
    min-height: unset;
  }
`

export const NameBlock = styled.div`
  padding: 28px 52px 0;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 76px 24px 0;
  }
`

export const NameHeading = styled.h1`
  font-size: clamp(52px, 9vw, 130px);
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1.0;
  color: ${({ $dimmed, theme }) => $dimmed ? 'rgba(0,0,0,0.38)' : theme.colors.text};
  transition: color 0.25s ease;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(40px, 11vw, 64px);
    white-space: normal;
    line-height: 1.05;
  }
`

export const Letter = styled.span`
  display: inline-block;
  will-change: transform, opacity;
`

export const Tagline = styled.p`
  font-size: clamp(13px, 1.4vw, 18px);
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.005em;
  margin-top: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 6px;
    font-size: 12px;
  }
`

export const BioCentered = styled.p`
  font-size: clamp(16px, 1.8vw, 24px);
  font-weight: 400;
  line-height: 1.65;
  letter-spacing: -0.018em;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 14px;
    line-height: 1.55;
  }
`

export const HeroPreviewZone = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MarqueeRow = styled.div`
  line-height: 1;
  padding-bottom: 28px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-bottom: 16px;
  }
`

export const MarqueeInner = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 52px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 28px;
  }
`

export const MarqueeWord = styled(Link)`
  font-family: 'Bebas Neue', 'Arial Narrow', Impact, sans-serif;
  font-size: clamp(28px, 7.5vw, 130px);
  font-weight: 400;
  line-height: 0.88;
  white-space: nowrap;
  display: block;
  letter-spacing: 0.01em;
  user-select: none;
  text-decoration: none;
  transition: color 0.25s ease, opacity 0.25s ease;
  color: ${({ $hovered, $accent, theme }) => $hovered ? $accent : theme.colors.text};
  opacity: ${({ $dimmed }) => ($dimmed ? 0.18 : 1)};
`
