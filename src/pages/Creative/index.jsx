import PageTransition from '../../components/common/PageTransition'
import {
  Wrapper,
  Container,
  PageTitle,
  Subtitle,
  MasonryGrid,
  FloatingImage,
  ImageSource,
} from './Creative.styles'

// ── Replace hrefs + srcs with real Unsplash/Instagram URLs ───────────────────
const IMAGES = [
  // Unsplash
  { src: 'https://picsum.photos/seed/u1/420/560', href: '#', source: 'unsplash', float: 1 },
  { src: 'https://picsum.photos/seed/u2/420/300', href: '#', source: 'unsplash', float: 2 },
  { src: 'https://picsum.photos/seed/u3/420/480', href: '#', source: 'unsplash', float: 3 },
  { src: 'https://picsum.photos/seed/u4/420/340', href: '#', source: 'unsplash', float: 1 },
  { src: 'https://picsum.photos/seed/u5/420/500', href: '#', source: 'unsplash', float: 2 },
  // Instagram
  { src: 'https://picsum.photos/seed/i1/420/420', href: '#', source: 'instagram', float: 3 },
  { src: 'https://picsum.photos/seed/i2/420/420', href: '#', source: 'instagram', float: 1 },
  { src: 'https://picsum.photos/seed/i3/420/420', href: '#', source: 'instagram', float: 2 },
  { src: 'https://picsum.photos/seed/i4/420/420', href: '#', source: 'instagram', float: 3 },
  { src: 'https://picsum.photos/seed/i5/420/420', href: '#', source: 'instagram', float: 1 },
]

const SOURCE_LABEL = {
  unsplash: 'Unsplash',
  instagram: 'Instagram',
}

export default function Creative() {
  return (
    <PageTransition>
      <Wrapper>
        <Container>
          <PageTitle>Creative.</PageTitle>
          <Subtitle>
            Photography, visual experiments, and moments — sourced from Unsplash and Instagram.
          </Subtitle>

          <MasonryGrid>
            {IMAGES.map((img, i) => (
              <FloatingImage
                key={i}
                href={img.href}
                target="_blank"
                rel="noopener noreferrer"
                $delay={i * 0.4}
                $float={img.float}
              >
                <img src={img.src} alt="" loading="lazy" />
                <ImageSource $source={img.source}>
                  {SOURCE_LABEL[img.source]}
                </ImageSource>
              </FloatingImage>
            ))}
          </MasonryGrid>
        </Container>
      </Wrapper>
    </PageTransition>
  )
}
