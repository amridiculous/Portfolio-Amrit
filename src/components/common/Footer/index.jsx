import { Foot, Inner, Copy } from './Footer.styles'

export default function Footer() {
  return (
    <Foot>
      <Inner>
        <Copy>© {new Date().getFullYear()} Amrit Das. All rights reserved.</Copy>
      </Inner>
    </Foot>
  )
}
