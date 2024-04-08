import ContentLoader from 'react-content-loader'

interface Props {
  className?: string
}

export default function ProductSkeleton({ className }: Props) {
  return (
    <div className={`padding-container px-2 py-3 ${className ? className : "col-3"}`}>
      <ContentLoader
        width="100%"
        backgroundColor={'#c5c5c5'}
        foregroundColor={'#999'}
        style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0, aspectRatio: "7 / 9"}}
        className="product-container p-0"
        speed={2}
        title='Cargando...'
      >
        <rect width="100%" height="100%" />


      </ContentLoader>
    </div>
  )
}
