import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.bg};
`

export const Hero = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`

export const NameBlock = styled.div`
  padding: 28px 52px 0;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 24px 28px 0;
  }
`

export const NameHeading = styled.h1`
  font-size: clamp(52px, 9vw, 130px);
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1.0;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    white-space: normal;
    line-height: 1.08;
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
`

export const HeroPreviewZone = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`

export const MarqueeRow = styled.div`
  line-height: 1;
  padding-bottom: 0;
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
