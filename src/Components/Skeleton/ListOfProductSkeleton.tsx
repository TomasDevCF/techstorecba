import ProductSkeleton from "./ProductSkeleton";

interface Props {
  quantityOfProducts: number,
  className?: string
}

export default function ListOfProductSkeleton({ quantityOfProducts, className }: Props) {
  function createListOfProduct() {
    let products = []

    for (let i = 0; i < quantityOfProducts; i++) {
      products.push(<ProductSkeleton className={className || "col-md-3 col-sm-4 col-6"} key={i}/>);
    }

    return products
  }

  return (
    <>
      {createListOfProduct().map(sk => sk)}
    </>
  )
}