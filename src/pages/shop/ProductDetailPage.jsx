import { useParams } from "react-router-dom";
import Decription from '../../component/shop/productDetail/decription';
import Intro from '../../component/shop/productDetail/intro'
import MoreProduct from '../../component/shop/productDetail/moreProduct';
import Footer from '../../component/footer';

const ProductDetailPage = () => {
  const { id } = useParams();
  console.log("Product ID:", id);

  return (
    <div>
        <Intro/>
        <Decription/>
        <MoreProduct/>
        <Footer/>
    </div>
  )
}

export default ProductDetailPage;