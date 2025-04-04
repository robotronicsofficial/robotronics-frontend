import img from "../../assets/images/customerProduct.svg";
import { MdModeEdit,MdDelete  } from "react-icons/md";
const CustomerProduct = ({ title, item, price, onNext }) => {
  return (
    <div className="flex flex-row space-x-3">
      <div>
        <img className="lg:h-20 lg:w-24" src={img} alt="" />
      </div>
      <div className="lg:text-base text-wrap text-sm flex flex-col gap-1">
        <p className="font-bold">{title}</p>
        <div className="flex gap-2">
        <span>No of Childrens :  </span>
        <p className="text-line"> {item}</p>
        </div>

        <div className="flex  items-center gap-3">
        <p className="font-bold">Pkr  {price}</p>
        <MdModeEdit className="cursor-pointer"/>
        <MdDelete className="text-red-600 cursor-pointer"  onClick={onNext}/>
        </div>
      </div>
    </div>
  );
};

export default CustomerProduct;
