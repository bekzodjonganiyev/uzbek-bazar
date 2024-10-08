import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Product = lazy(() => import('./product/Product'));
const Products = lazy(() => import('./products/Products'));
const Order = lazy(() => import('./order/Order'));
const FreshOrders = lazy(() => import('./fresh-orders/FreshOrders'))
const Orders = lazy(() => import('./orders/Orders'));
const ProductVariablesForm = lazy(() => import('./product/ProductVariablesForm'));

const ECommerceAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/e-commerce/products',
      element: <Products />,
    },
    // {
    //   path: 'apps/e-commerce/product/variables',
    //   element: <ProductVariablesForm />,
    // },
    {
      path: 'apps/e-commerce/products/:productId/*',
      element: <Product />,
    },
    {
      path: 'apps/e-commerce/orders',
      element: <Orders />,
    },
    {
      path: 'apps/e-commerce/fresh-orders',
      element: <FreshOrders />,
    },
    {
      path: 'apps/e-commerce/orders/:orderId',
      element: <Order />,
    },
    {
      path: 'apps/e-commerce',
      element: <Navigate to="products" />,
    },
  ],
};

export default ECommerceAppConfig;
