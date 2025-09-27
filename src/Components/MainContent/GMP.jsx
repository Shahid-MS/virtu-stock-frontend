import React from "react";
import ipos from "../../IPOs/ipos";
import { useParams } from "react-router-dom";

const GMP = () => {
  const { id } = useParams();
  const ipo = ipos.find((item) => item.id === id);
  return (
    <div className="container p-3 text-secondary-emphasis">
      <div className="row p-2">
        <div className="col">
          <div className="contaner d-flex">
            <img src={ipo.logo} alt={ipo.name} width="100" height="25" />
            <div className="container">
              <h4>
                <b>{ipo.name}</b>
              </h4>
              <p className="text-secondary">
                <b>{ipo.symbol}</b>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row p-2">
        <div className=" col-12 table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">GMP Date</th>
                <th scope="col">IPO Price</th>
                <th scope="col">GMP</th>
                <th scope="col">Estimated Listing Price</th>
                <th scope="col">Estimated Profit</th>
                <th scope="col">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GMP;
