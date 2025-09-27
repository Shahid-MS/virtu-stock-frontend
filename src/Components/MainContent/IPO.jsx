import React from "react";
import { Link, useParams } from "react-router-dom";
import ipos from "../../IPOs/ipos";

const IPO = () => {
  const { id } = useParams();
  const ipo = ipos.find((item) => item.id === id);
  return (
    <div className="container p-3 text-secondary-emphasis">
      <div className="row p-2">
        <div className="col-8">
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
        <div className="col-4">
          <div className="container d-flex flex-column">
            <div>
              <h4 className="d-inline">
                {ipo.minAmount.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                })}
              </h4>
              <span className="ms-2">/ {ipo.minQty} Shares</span>
            </div>
            <p className="text-secondary p-2">Minimum Investment</p>
          </div>
        </div>
      </div>

      <div className="row p-2">
        <h3>Details</h3>
        <div className="row p-3 fs-6">
          <div className="col-3">
            Bidding Dates
            <p className="text-secondary">
              {new Date(ipo.startDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              <span className="mx-2">-</span>
              {new Date(ipo.endDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="col-3">
            Minimum Investment
            <p className="text-secondary">
              {ipo.minAmount.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className="col-3">
            Lot Size
            <p className="text-secondary">{ipo.minQty}</p>
          </div>
          <div className="col-3">
            Price Range
            <p className="text-secondary">₹{ipo.priceRange}</p>
          </div>
        </div>
        <div className="row p-3 fs-6">
          <div className="col-3">
            Issue Size
            <p className="text-secondary">₹{ipo.issueSize}</p>
          </div>
          <div className="col-3">
            Listing Date
            <p className="text-secondary">
              {new Date(ipo.listingDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="col-3">
            IPO Doc
            <p>
              <a href={ipo.prospectusUrl} className="text-success">
                <b>Link</b>
              </a>
            </p>
          </div>
           <div className="col-3">
            GMP
            <p>
              <Link to={`/ipo/gmp/${ipo.id}`} className="text-success">
                <b>Link</b>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="row p-2">
        <h3>Subscription Rate</h3>
        <table class="table">
          <tbody>
            {ipo.subsrciption.map((subs) => (
              <tr>
                <td>{subs.name}</td>
                <td>{subs.value}x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row p-2">
        <h3>About</h3>
        <p className="text-secondary">{ipo.about}</p>
      </div>

      <div className="row p-2">
        <h3 className="text-success">Strength</h3>
        <ul class="ms-3">
          {ipo.strengths.map((strength) => (
            <li class="">{strength}</li>
          ))}
        </ul>
      </div>

      <div className="row p-2">
        <h3 className="text-danger">Risks</h3>
        <ul class="ms-3">
          {ipo.risks.map((risk) => (
            <li>{risk}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IPO;
