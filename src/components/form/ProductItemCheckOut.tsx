import { CartProduct } from "../../types";

export function ProductItemCheckOut({
  product,
  CId,
}: {
  product: CartProduct;
  CId: string;
}) {
  return (
    <div
      key={"chr-" + product.id + CId}
      className="flex justify-between items-center"
    >
      <div key={"chr-0" + product.id + CId}>
        <h3 className="font-medium text-gray-300">{product.title}</h3>
      </div>
      <span
        key={"chr-1" + product.id + CId}
        className="font-semibold text-gray-300"
      >
        ${product.price}
      </span>
    </div>
  );
}
