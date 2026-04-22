import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const PanelsWrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    height: auto;
  }
`

export const Panel = styled(Link)`
  position: relative;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 32px 32px 40px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  text-decoration: none;
  transition: flex 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:last-child {
    border-right: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    &:hover {
      flex: 1.2;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 50vh;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    &:last-child {
      border-bottom: none;
    }
  }
`

export const PreviewOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.45s ease;
  background: ${({ $bg }) => $bg || 'transparent'};

  ${Panel}:hover & {
    opacity: 1;
  }
`

export const CanvasWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.45s ease;

  ${Panel}:hover & {
    opacity: 1;
  }
`

export const PanelContent = styled.div`
  position: relative;
  z-index: 2;
`

export const PanelCategory = styled.span`
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ $accentColor }) => $accentColor};
  margin-bottom: 10px;
`

export const PanelTitle = styled.h2`
  font-size: clamp(26px, 3vw, 48px);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.05;
`

export const PanelSubtitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.005em;
  line-height: 1.55;
  max-width: 240px;
  margin-top: 8px;
`

export const PreviewList = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px 52px 24px;
  pointer-events: none;
`

export const PreviewItem = styled.div`
  padding: 10px 0;
  border-top: 1px solid ${({ $borderColor }) => $borderColor || 'rgba(0,0,0,0.08)'};
  display: flex;
  align-items: baseline;
  gap: 20px;

  &:last-child {
    border-bottom: 1px solid ${({ $borderColor }) => $borderColor || 'rgba(0,0,0,0.08)'};
  }
`

export const PreviewIndex = styled.span`
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: ${({ $color }) => $color || '#6e6e73'};
  flex-shrink: 0;
  opacity: 0.6;
  min-width: 22px;
`

export const PreviewItemTitle = styled.span`
  font-size: clamp(12px, 1.1vw, 15px);
  font-weight: 500;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
  flex: 1;
`

export const PreviewItemMeta = styled.span`
  font-size: 10px;
  letter-spacing: 0.01em;
  color: ${({ $color }) => $color || '#6e6e73'};
  flex-shrink: 0;
  opacity: 0.7;
`
