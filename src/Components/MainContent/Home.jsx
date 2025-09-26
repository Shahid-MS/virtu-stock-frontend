import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ipos from "../../IPOs/ipos";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container p-3">
      <h3>IPO - Initial Public Offering</h3>
      <div className="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Company</th>
              <th scope="col">Type</th>
              <th scope="col">Open Date</th>
              <th scope="col">Close Date</th>
            </tr>
          </thead>
          <tbody>
            {ipos.map((ipo, idx) => {
              const today = new Date();
              const isIpoOpen =
                new Date(ipo.startDate) <= today &&
                today <= new Date(ipo.endDate);
              return (
                <tr
                  key={idx}
                  onClick={() => navigate(`/ipo/${ipo.id}`)}
                  style={{background:"green"}}
                >
                  <th scope="row">{idx + 1}</th>
                  <td>
                    <img
                      src={ipo.logo}
                      alt={ipo.name}
                      width="125"
                      height="65"
                      className="me-3"
                    />
                    <span   className={isIpoOpen ? "text-success" : ""}>{ipo.name}</span>
                  
                  </td>
                  <td>{ipo.type === "SME" ? "SME" : "Mainboard"}</td>

                  <td>
                    {new Date(ipo.startDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td>
                    {new Date(ipo.endDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
