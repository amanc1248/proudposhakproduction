import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../../actions/orderActions";
import { useNavigate } from "react-router-dom";

function CustomerOrders() {
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;
  console.log("===my orders=======================");
  console.log(orders);
  console.log("====================================");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const theCustomerId = userInfo && userInfo[0]["customerId"];
  console.log("====================================");
  console.log(theCustomerId);
  console.log("====================================");
  useEffect(() => {
    dispatch(listMyOrders(theCustomerId));
  }, [dispatch, userInfo, theCustomerId]);
  let navigate = useNavigate();

  return (
    <div className="customer__orders">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order No.</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Customer</th>
            <th scope="col">Total Price</th>
            <th scope="col">Items</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((obj, index) => {
            return (
              <tr>
                <th scope="row">{parseInt(index + 1)} </th>
                <td>{obj.orderId}</td>
                <td>{obj.date}</td>
                <td>{obj.deliveredStatus}</td>
                <td>{obj.name}</td>
                <td>{obj.total_price}</td>
                <td>
                  <div
                    className="see__order__details__button"
                    onClick={() => {
                      navigate(`/orders/${obj.orderId}`);
                    }}
                  >
                    See Order Details
                  </div>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default CustomerOrders;
