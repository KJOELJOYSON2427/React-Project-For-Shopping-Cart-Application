import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [listOfProducts, setlistOfProducts] = useState([]);
  const [productDetails, setproductDetails] = useState(null);
  const [cartItem, setcartitem] = useState([])
  const navigate = useNavigate()

  const fetchListOfProductslist = async () => {
    setLoading(true)
    const apiResponse = await fetch('https://dummyjson.com/products');
    const result = await apiResponse.json();
    setLoading(true)

    if (result && result.products) {
      setlistOfProducts(result.products);
      setLoading(false)
    }
  };
  const handlertoCart = (productitemfromCart) => {
    console.log("hi");

    console.log(productitemfromCart);
    let cpyExistingcartItems = [...cartItem]
    const findIndexOfCurrectItem = cpyExistingcartItems.findIndex((singleItem) => (singleItem.id === productitemfromCart.id))
    console.log(findIndexOfCurrectItem);
    if (findIndexOfCurrectItem === -1) {
      cpyExistingcartItems.push({
        ...productitemfromCart,
        quantity: 1,
        totalPrice: productitemfromCart?.price
      })

    } else {
      console.log("It came");
      cpyExistingcartItems[findIndexOfCurrectItem] = {
        ...cpyExistingcartItems[findIndexOfCurrectItem],
        quantity: cpyExistingcartItems[findIndexOfCurrectItem].quantity + 1,
        totalPrice: (cpyExistingcartItems[findIndexOfCurrectItem].quantity + 1) *
          cpyExistingcartItems[findIndexOfCurrectItem].price,
      }

    }
    console.log(cpyExistingcartItems);
    setcartitem(cpyExistingcartItems);
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingcartItems))
    navigate("/cartPage")
  }
  function handleRemoveFromCart(getProductDetails, isfullyremoved) {
    let cpyExistingcartItems = [...cartItem];
    const findIndexOfCurrectCartItem = cpyExistingcartItems.findIndex(
      (item) => item.id === getProductDetails.id
    );
    if (isfullyremoved) {
      cpyExistingcartItems.splice(findIndexOfCurrectCartItem, 1);
    } else {
      cpyExistingcartItems[findIndexOfCurrectCartItem] = {
        ...cpyExistingcartItems[findIndexOfCurrectCartItem],
        quantity: cpyExistingcartItems[findIndexOfCurrectCartItem].quantity - 1,
        totalPrice: (cpyExistingcartItems[findIndexOfCurrectCartItem].quantity - 1) * cpyExistingcartItems[findIndexOfCurrectCartItem].price,
      };
    }
    localStorage.setItem('cartItems', JSON.stringify(cpyExistingcartItems))
    setcartitem(cpyExistingcartItems)
  }
  useEffect(() => {
    fetchListOfProductslist();
    setcartitem(JSON.parse(localStorage.getItem('cartItems')) || [])
  }, []); // This will run only once when the component mounts

  console.log(listOfProducts);

  return (
    <ShoppingCartContext.Provider value={{
      listOfProducts,
      loading,
      setLoading,
      setproductDetails,
      productDetails,
      handlertoCart,
      cartItem,
      handleRemoveFromCart
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
