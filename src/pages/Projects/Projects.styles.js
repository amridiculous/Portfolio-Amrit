import styled from 'styled-components'

export const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.bg};
  padding-top: 80px;
  min-height: 100vh;
`

export const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 60px 22px 100px;
`

export const PageTitle = styled.h1`
  font-size: clamp(42px, 7vw, 80px);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
  margin-bottom: 16px;
`

export const Subtitle = styled.p`
  font-size: clamp(16px, 2vw, 21px);
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.012em;
  line-height: 1.5;
  margin-bottom: 56px;
  max-width: 540px;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 28px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 12px;
  will-change: transform;
  cursor: default;
`

export const CardBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`

export const CardTitle = styled.h3`
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.25;
`

export const CardDesc = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.008em;
  flex: 1;
`

export const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

export const Tag = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 3px 10px;
  letter-spacing: 0.01em;
`

export const CardLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: -0.01em;
  transition: opacity 0.2s ease;
  margin-top: 4px;

  &:hover {
    opacity: 0.7;
  }
`
