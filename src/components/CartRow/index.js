const CartRow = ({ product, deleteProduct }) => {
  const { id, name, price, imgUrl } = product;

  const quantity = +JSON.parse(localStorage.getItem("cart"))[product.id];

  const subtotal = price * quantity;

  return (
    <tr key={`product-${id}`}>
      <td className="prod-img ">
        <img className="resp-img" src={imgUrl} alt={name} />
      </td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>${subtotal}</td>
      <td>
        <button onClick={deleteProduct}>Delete</button>
      </td>
    </tr>
  );
};

export default CartRow;
