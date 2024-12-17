import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";


export default function SingleProduct({singleProductItem}) {
  const navigate=useNavigate()
  const { handlertoCart,
    cartItem}=useContext(ShoppingCartContext)
  function  handleMovingToProductDetails(SingleProductItemId) {
    
    console.log(SingleProductItemId);
    navigate(`/product-details/${SingleProductItemId}`)
  }
  return (
    <div className="relative group border border-cyan-700 p-6 cursor-pointer">
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
       <img 
       src={singleProductItem?.thumbnail}
       alt={singleProductItem?.title} className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"/>
      </div>
      <div className="flex items-start justify-between mt-4 space-x-4">
        <div className="font-bold text-gray-900 sm:text-sm text-xs md:text-base">
          <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{singleProductItem?.title}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]">
              ${singleProductItem?.price}
          </p>
        </div>
      </div>
      <button 
      onClick={()=>handleMovingToProductDetails(singleProductItem?.id)}
         className="px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg">
            Veiw Details
        </button>
        <button 
        disabled={
          cartItem.findIndex((item) => item.id === singleProductItem.id) > -1
        } className="disabled:opacity-65 px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg"
         onClick={()=>handlertoCart(singleProductItem)}>
         Add to cart
        </button>
    </div> 
  )
}
