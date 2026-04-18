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
  margin-bottom: 56px;
  max-width: 500px;
`

export const Timeline = styled.div`
  position: relative;
`

export const TimelineItem = styled.div`
  position: relative;
  padding-left: 32px;
  padding-bottom: 52px;

  &:last-child {
    padding-bottom: 0;
  }
`

export const TimelineDot = styled.div`
  position: absolute;
  left: 0;
  top: 7px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.text};
`

export const TimelineLine = styled.div`
  position: absolute;
  left: 4px;
  top: 20px;
  bottom: 0;
  width: 1px;
  background: ${({ theme }) => theme.colors.border};
`

export const TimelineContent = styled.div``

export const Period = styled.span`
  display: block;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 6px;
`

export const Role = styled.h3`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.022em;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2px;
`

export const Company = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 500;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
`

export const Description = styled.p`
  font-size: 15px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.008em;
  margin-bottom: 16px;
`

export const AchievementList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 7px;
`

export const Achievement = styled.li`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.008em;
  padding-left: 16px;
  position: relative;

  &::before {
    content: '—';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.borderSolid};
    font-size: 12px;
  }
`
