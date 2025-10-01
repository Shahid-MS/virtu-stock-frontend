import ComponentCard from "../../components/common/ComponentCard";

import BasicTableOne from "../Dashboard/HomeIPO";

export default function BasicTables() {
  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="IPOs">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
