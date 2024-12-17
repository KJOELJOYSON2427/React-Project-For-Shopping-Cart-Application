import { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../../context";


export default function CartTile({ singleCartItem }) {
  console.log(singleCartItem);

  const { handleRemoveFromCart, handlertoCart } = useContext(ShoppingCartContext)
  return (
    <Fragment>
      <div className="grid grid-cols-3 items-start gap-5">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
            <img
              src={singleCartItem?.thumbnail} className="w-full h-full object-contain" />

          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {singleCartItem?.title}
            </h3>
            <p className="mt-2 mb-3 font-bold text-[16px]">Quantity:{singleCartItem?.quantity}</p>
            <button onClick={() => handleRemoveFromCart(singleCartItem, true)} className="text-sm px-4 py-3 bg-black text-white font-extrabold">
              Remove
            </button>
          </div>
        </div>
        <div className="ml-auto">
          {singleCartItem?.totalPrice > 0 && (
            <h3 className="text-lg font-bold text-gray-900">
              ${singleCartItem?.totalPrice.toFixed(2)}
            </h3>
          )}
          <div className="mt-3">
            <button onClick={() => handleRemoveFromCart(singleCartItem, false)}
              className="disabled:opacity-65 border border-[#000] text-white"
              disabled={singleCartItem?.quantity < 0}>-</button>
            <button className="border border-[#151414] text-white"
              onClick={() => handlertoCart(singleCartItem)} >+</button>
          </div>


        </div>
        <hr className="border-gray-500" />

      </div>
    </Fragment>
  )
}