import { useParams } from "react-router-dom";
import Decription from '../../component/shop/productDetail/decription';
import Intro from '../../component/shop/productDetail/intro'
import MoreProduct from '../../component/shop/productDetail/moreProduct';

const ProductDetailPage = () => {
  const { id } = useParams();
  console.log("Product ID:", id);

  return (
    <div className="pt-[9rem] bg-lightgray">
        <Intro/>
        <Decription/>
        <MoreProduct/>
    </div>
  )
}

export default ProductDetailPage;