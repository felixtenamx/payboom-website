import { Helmet } from 'react-helmet-async'

interface MetaTagsProps {
  title: string
  description: string
  path?: string
  ogImage?: string
}

export default function MetaTags({ title, description, path = '', ogImage }: MetaTagsProps) {
  const url = `https://payboom.io${path}`
  const img = ogImage || 'https://payboom.io/og-image.png'

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Payboom" />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}