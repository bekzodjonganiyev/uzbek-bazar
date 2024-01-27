import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleMap from 'google-map-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import OrdersStatus from '../OrdersStatus';
import { selectOrder } from '../../store/orderSlice';

function Marker(props) {
  return (
    <Tooltip title={props.text} placement="top">
      <FuseSvgIcon className="text-red">heroicons-outline:location-marker</FuseSvgIcon>
    </Tooltip>
  );
}

function OrderDetailsTab() {
  const order = useSelector(selectOrder);
  console.log(order, "orderdetailstab")
  const [map, setMap] = useState('shipping');

  return (
    <div>
      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <FuseSvgIcon color="action">heroicons-outline:user-circle</FuseSvgIcon>
          <Typography className="h2 mx-12 font-medium" color="text.secondary">
            Mijoz
          </Typography>
        </div>

        <div className="mb-24">
          <div className="table-responsive mb-48">
            <table className="simple">
              <thead>
                <tr>
                  <th>
                    <Typography className="font-semibold">Ism Familiya</Typography>
                  </th>
                  {/* <th>
                    <Typography className="font-semibold">Email</Typography>
                  </th> */}
                  <th>
                    <Typography className="font-semibold">Phone</Typography>
                  </th>
                  {/* <th>
                    <Typography className="font-semibold">Company</Typography>
                  </th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center">
                      {/* <Avatar src={order.user} /> */}
                      <Typography className="truncate mx-8">
                        {`${order.user.first_name + order.user.last_name}`}
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <Typography className="truncate">{order.phone}</Typography>
                  </td>
                  <td>
                    {/* <span className="truncate">{order.user}</span> */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <div className="pb-48">
        <div className="pb-16 flex items-center">
          <FuseSvgIcon color="action">heroicons-outline:clock</FuseSvgIcon>
          <Typography className="h2 mx-12 font-medium" color="text.secondary">
            Buyurtma Statusi
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">Status</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Yangilangan vaqti</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {order.status.map((status) => (
                <tr>
                  <td>
                    <OrdersStatus name={status} />
                  </td>
                  <td>{order.status}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div> */}

      {/* <div className="pb-48">
        <div className="pb-16 flex items-center">
          <FuseSvgIcon color="action">heroicons-outline:currency-dollar</FuseSvgIcon>
          <Typography className="h2 mx-12 font-medium" color="text.secondary">
            Payment
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">TransactionID</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Payment Method</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Amount</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Date</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="truncate">{order.user}</span>
                </td>
                <td>
                  <span className="truncate">{order.total}</span>
                </td>
                <td>
                  <span className="truncate">{order.total_quantity}</span>
                </td>
                <td>
                  <span className="truncate">{order.created_at}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}

    </div>
  );
}

export default OrderDetailsTab;
