import styled from 'styled-components'

export const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.bg};
`

export const Hero = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 22px 80px;
  text-align: center;
  gap: 24px;
  position: relative;
`

export const NameBlock = styled.div`
  overflow: hidden;
`

export const NameHeading = styled.h1`
  font-size: clamp(54px, 11vw, 120px);
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

export const Bio = styled.div`
  max-width: 520px;
`

export const BioText = styled.p`
  font-size: clamp(16px, 2.2vw, 22px);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.012em;
  line-height: 1.55;
`

export const AvatarBlock = styled.div`
  margin-top: 12px;
`

export const AvatarCircle = styled.div`
  width: 152px;
  height: 152px;
  border-radius: 50%;
  background: linear-gradient(160deg, #f5f5f7 0%, #e4e4ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.06),
    0 16px 48px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.04);
`

export const AvatarInitials = styled.span`
  font-size: 46px;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
  user-select: none;
`

export const ScrollHint = styled.div`
  position: absolute;
  bottom: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`

export const ScrollDot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.35;
`
