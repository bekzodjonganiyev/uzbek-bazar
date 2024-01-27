import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectOrder } from '../../store/orderSlice';

function ProductsTab() {
  const order = useSelector(selectOrder);
  console.log(order.order_items, "order items")
  return (
    <div className="table-responsive">
      <table className="simple">
        <thead>
          <tr>
            <th>
              <Typography className="font-semibold">ID</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Rasm</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Nomi</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Narxi</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Miqdori</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {order.order_items.map((product) => (
            <tr key={product.id}>
              <td className="w-64">{product.id}</td>
              <td className="w-80">
                <img className="product-image" src={product.product.photo} alt="product" />
              </td>
              <td>
                <Typography
                  component={Link}
                  to={`/apps/e-commerce/products/${product.id}`}
                  className="truncate"
                  style={{
                    color: 'inherit',
                    textDecoration: 'underline',
                  }}
                >
                  {product.product.name}
                </Typography>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">${product.price}</span>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">{product.quantity}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTab;
