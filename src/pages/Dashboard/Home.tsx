import ComponentCard from "../../components/common/ComponentCard";
import HomeIPO from "./HomeIPO";

export default function Home() {
  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="IPOs">
          <HomeIPO />
        </ComponentCard>
      </div>
    </>
  );
}
