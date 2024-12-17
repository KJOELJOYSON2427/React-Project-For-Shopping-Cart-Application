import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

export default function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate()
  const { id } = params; // Extract the id parameter from useParams
  console.log("Product ID:", id);
  const { setproductDetails, setLoading, productDetails, loading, handlertoCart, cartItem } = useContext(ShoppingCartContext)

  // Function to fetch product details

  async function fetchSingleproductDetails(productId) {
    try {
      const apiResponse = await fetch(`https://dummyjson.com/products/${productId}`); // Await fetch
      const result = await apiResponse.json(); // Await the json parsing
      console.log("Product Details:", result);
      if (result) {
        setproductDetails(result);
        setLoading(false)
      }
    } catch (e) {
      console.error("Error fetching product details:", e);
    }
  }

  // useEffect to fetch product details when id changes
  useEffect(() => {
    if (id) { // Ensure id is available before calling the function
      fetchSingleproductDetails(id);
    }
  }, [id]);
  console.log(productDetails);


  if (loading) return <p>Loading the Image</p>
  return (
    <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
      <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6">
        <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
          <div className="px-4 py-10 rounded-xl shadow-lg relative">
            <img
              className="w-4/5 rounded object-cover"
              src={productDetails?.thumbnail}
              alt={productDetails?.title}
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
            {
              productDetails?.images?.length ?
                productDetails?.images.map((imageItem) => (
                  <div className="rounded-xl p-4 shadow-md" key={imageItem}>
                    <img
                      src={imageItem}
                      className="w-24 cursor-pointer"
                      alt="Product Secondary image"
                    />

                  </div>
                )) : <h3>Check the Products Later</h3>

            }
          </div>

        </div>
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-extrabold text-[#131212]">
            {productDetails?.title}
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            <p className="text-xl font-bold">${productDetails?.price}</p>
          </div>
        </div>
        <div>
          <button
            disabled={
              !productDetails || cartItem.findIndex((item) => item.id === productDetails.id) > -1
            }
            onClick={() => handlertoCart(productDetails)}
            className="disabled:opacity-65 mt-5 min-w-[200px] px-4 py-3 border border-[#333] bg-transparent text-sm font-semibold rounded"
          >
            Add to Cart
          </button>          </div>
      </div>
    </div>
  );
}
