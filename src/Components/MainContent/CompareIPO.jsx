import React from "react";
import ipos from "../../IPOs/ipos";

const CompareIPO = () => {
  return (
    <div className="container p-3">
      <h3>IPO - Compare</h3>
      <div className="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Company</th>
              <th scope="col">Issue Price</th>
              <th scope="col">GMP</th>
              <th scope="col">Subs Rate</th>
              <th scope="col">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {ipos.map((ipo, idx) => {
              return (
                <tr
                  key={idx}
                >
                  <th scope="row">{idx + 1}</th>
                  <td>{ipo.name}</td>
                  <td>{ipo.priceRange}</td>
                  <td>{10 +" ( 11.5% )"}</td>
                  <td> 5x </td>
                  <td>yes / No</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareIPO;
