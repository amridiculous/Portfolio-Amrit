import styled from 'styled-components'

export const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.bg};
  padding-top: 80px;
  min-height: 100vh;
`

export const Container = styled.div`
  max-width: 780px;
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
  margin-bottom: 64px;
  max-width: 560px;
`

export const Section = styled.section`
  margin-bottom: 64px;
`

export const SectionLabel = styled.h2`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
`

export const BioBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const BioText = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.008em;
`

export const CategoryGroup = styled.div`
  margin-bottom: 36px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const CategoryLabel = styled.h3`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $color }) => $color || 'inherit'};
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ $color }) => $color ? `${$color}30` : 'transparent'};
`

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 10px;
`

export const SkillCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 18px 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 2px solid ${({ $color }) => $color ? `${$color}55` : 'transparent'};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`

export const SkillName = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.01em;
  margin-bottom: 4px;
`

export const SkillLevel = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const CertsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 10px;
`

export const CertBadge = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 18px 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 2px solid ${({ $color }) => $color ? `${$color}55` : 'transparent'};
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.01em;
  line-height: 1.4;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`
