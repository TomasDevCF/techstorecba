import ContentLoader from 'react-content-loader'

export default function ProductInfoSkeleton() {
  return (
      <ContentLoader
        height="120vh"
        width="100%"
        backgroundColor={'#c5c5c5'}
        foregroundColor={'#999'}
        className="product-info py-5 px-4"
        speed={2}
        title='Cargando...'
      >
        <rect style={{borderRadius: "10px", padding: "80px"}} x="0" className='col-8' height="385"/>
        <rect style={{borderRadius: "10px", padding: "80px"}} x="0" y="400" className="col-2" height="130"/>
        <rect style={{borderRadius: "10px", padding: "80px"}} x="210" y="400" className="col-2" height="130"/>
        <rect style={{borderRadius: "10px", padding: "80px"}} x="420" y="400" className="col-2" height="130"/>
        <rect style={{borderRadius: "10px", padding: "80px"}} x="630" y="400" className="col-2" height="130"/>
        <rect x="820" y="0" className="col-4" height="80"/>
        <rect x="820" y="90" width={140} height="20"/>
        <rect x="820" y="125" width={160} height="20"/>
        <rect x="820" y="160" width={127} height="20"/>
        <rect x="820" y="210" width={100} height="33"/>
        <rect x="820" y="260" width={300} height="55"/>
      

      </ContentLoader>
  )
}
