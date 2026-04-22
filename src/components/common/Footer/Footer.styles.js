import styled from 'styled-components'

export const Foot = styled.footer`
  padding: 28px 0;
  background: ${({ theme }) => theme.colors.bg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
