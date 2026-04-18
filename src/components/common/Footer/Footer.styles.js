import styled from 'styled-components'

export const Foot = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 28px 0;
  background: ${({ theme }) => theme.colors.surface};
`

export const Inner = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 0 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const Copy = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.005em;
`

export const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const SocialLink = styled.a`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s ease;
  letter-spacing: -0.005em;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`
