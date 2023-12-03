import { useEffect, useState, useMemo } from "react";
import "./cartPage.css";
import CartRow from "../CartRow";

import { useContext } from "react";

import CartContext from "../../contexts/cartContext";

const CartPage = () => {
  const [addedProducts, setAddedProducts] = useState({
    data: [],
    loading: true,
  });

  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => console.log(cartItems), [cartItems]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((res) => {
        const cartAssoc = JSON.parse(localStorage.getItem("cart")) || {};
        const addedItems = res.filter((product) => cartAssoc[product.id]);
        setAddedProducts({ data: addedItems, loading: false });
      });
  }, []);

  /* რეალურ პროექტში ყველა პროდუქტს არ მოვითხოვთ სერვერიდან,
  სერვერზე POST მეთოდით უნდა გაიგზავნოს პროდუქტების id - ბის მასივი და backend-სგან ვიღებთ ამ id - ბის შესაბამის პროდუქტების სიას.
  უბრალოდ json სერვერი არ გვაძლევს ამის შესაძლებლობას
  */

  if (addedProducts.loading) return "...loading";

  if (!addedProducts.data.length && !addedProducts.loading) {
    return "No Items added";
  }

  function calculateTotalPrice(products, itemQuantities) {
    const totalPrice = Object.keys(itemQuantities).reduce((acc, itemId) => {
      const foundProduct = products.find(
        (product) => product.id === parseInt(itemId)
      );

      if (foundProduct) {
        const quantity = itemQuantities[itemId];
        const price = foundProduct.price;
        return acc + parseInt(quantity) * parseInt(price);
      } else {
        return acc;
      }
    }, 0);
    return totalPrice;
  }

  const totalPrice = calculateTotalPrice(addedProducts.data, cartItems);

  function deleteProduct(id) {
    console.log(cartItems[id]);
    const { [id]: delKey, ...newObj } = cartItems;
    setCartItems(newObj);
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>name</th>
            <th>price</th>
            <th>quantity</th>
            <th>subtotal</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {addedProducts.data.map((product) => (
            <CartRow
              product={product}
              key={product.id}
              deleteProduct={() => deleteProduct(product.id)}
            />
          ))}
        </tbody>
      </table>
      <p>
        <strong>Total: </strong> ${totalPrice}
      </p>
    </>
  );
};

export default CartPage;
