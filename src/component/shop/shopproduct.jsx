import mask from "../../assets/images/shopMask.svg"
const Shopproduct = ({title, price,image}) => {
  return (
    <div className="flex flex-col p-2" >
        {/* img */}
            
            
        <div className="transition duration-300 ease-in-out hover:opacity-70" >
              <img className="rounded-2xl w-[18vw]" src={image} alt="" />
              <button className="bg-yellow p-2 lg:px-7 text-white poppins-medium rounded-lg" >ADD TO CARD</button>

        </div>
            
        {/* text */}  
        <div className="" >
            <p className="text-lightblack hover:text-black hover:border-black text-xl poppins-bold my-2" >{title}</p>
            <p className="text-gold hover:text-yellow hover:border-black" >PKR {price}</p>
        </div>
        
    </div>
  )
}

export default Shopproduct;