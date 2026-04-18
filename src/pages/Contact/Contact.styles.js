import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.bg};
  padding-top: 80px;
  min-height: 100vh;
`

export const Container = styled.div`
  max-width: 900px;
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
  max-width: 420px;
`

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 64px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export const InfoItem = styled.div`
  margin-bottom: 28px;
`

export const InfoLabel = styled.p`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 6px;
`

export const InfoLink = styled.a`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s ease;
  letter-spacing: -0.01em;
  display: block;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 22px;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`

export const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.005em;
`

const inputBase = `
  width: 100%;
  padding: 11px 14px;
  font-size: 15px;
  line-height: 1.5;
  border-radius: 14px;
  border: 1px solid;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
`

export const Input = styled.input`
  ${inputBase}
  font-family: ${({ theme }) => theme.fonts.base};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border-color: ${({ theme }) => theme.colors.border};

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.12);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.45;
  }
`

export const Textarea = styled.textarea`
  ${inputBase}
  font-family: ${({ theme }) => theme.fonts.base};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border-color: ${({ theme }) => theme.colors.border};
  resize: vertical;
  min-height: 130px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.12);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.45;
  }
`

export const SubmitButton = styled(motion.button)`
  align-self: flex-start;
  padding: 13px 26px;
  font-family: ${({ theme }) => theme.fonts.base};
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  background: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #333;
  }
`

export const FormNote = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.005em;
`
