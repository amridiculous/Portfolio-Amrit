import styled, { keyframes } from 'styled-components'

const float1 = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33%       { transform: translateY(-10px) rotate(0.4deg); }
  66%       { transform: translateY(5px) rotate(-0.3deg); }
`

const float2 = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  40%       { transform: translateY(8px) rotate(-0.5deg); }
  75%       { transform: translateY(-6px) rotate(0.3deg); }
`

const float3 = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25%       { transform: translateY(-7px) rotate(0.6deg); }
  60%       { transform: translateY(10px) rotate(-0.4deg); }
`

const floatMap = { 1: float1, 2: float2, 3: float3 }

export const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.bg};
  padding-top: 80px;
  min-height: 100vh;
`

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 60px 32px 120px;
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
  max-width: 540px;
`

export const MasonryGrid = styled.div`
  columns: 3;
  column-gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    columns: 2;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    columns: 1;
  }
`

export const FloatingImage = styled.a`
  display: block;
  break-inside: avoid;
  margin-bottom: 20px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  animation: ${({ $float }) => floatMap[$float] || float1}
    ${({ $delay }) => 4.5 + ($delay % 2.5)}s
    ${({ $delay }) => $delay}s
    ease-in-out infinite;
  will-change: transform;
  transition: box-shadow 0.3s ease, filter 0.3s ease;

  img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.5s ease;
  }

  &:hover {
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    filter: brightness(0.96);

    img {
      transform: scale(1.03);
    }
  }
`

export const ImageSource = styled.span`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 99px;
  backdrop-filter: blur(8px);
  color: ${({ $source }) => $source === 'instagram' ? '#fff' : '#fff'};
  background: ${({ $source }) =>
    $source === 'instagram'
      ? 'linear-gradient(135deg, rgba(214,41,118,0.85), rgba(255,149,0,0.85))'
      : 'rgba(0,0,0,0.45)'};
`
