const STORAGE_PUBLIC_PATH = '/storage/v1/object/public/'
const STORAGE_RENDER_PATH = '/storage/v1/render/image/public/'

export function getProductImageUrl(imageUrl, width = 640) {
  if (!imageUrl || !imageUrl.includes(STORAGE_PUBLIC_PATH)) {
    return imageUrl
  }

  const [origin, path] = imageUrl.split(STORAGE_PUBLIC_PATH)
  const params = new URLSearchParams({
    width: String(width),
    quality: '78',
    resize: 'cover',
  })

  return `${origin}${STORAGE_RENDER_PATH}${path}?${params.toString()}`
}

export function getProductImageSrcSet(imageUrl) {
  return [320, 640, 960]
    .map((width) => `${getProductImageUrl(imageUrl, width)} ${width}w`)
    .join(', ')
}
