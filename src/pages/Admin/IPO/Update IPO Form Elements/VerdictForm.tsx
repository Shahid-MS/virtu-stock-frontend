import { Dispatch, SetStateAction, useState } from "react";
import ComponentCard from "../../../../components/common/ComponentCard";
import Radio from "../../../../components/form/input/Radio";
import { Verdict } from "../../../../Enum/Verdict";
import { IPOInterface } from "../../../../Interface/IPO";

interface VerdictFormInterface {
  ipo: IPOInterface | undefined;
  setIpo: Dispatch<SetStateAction<IPOInterface | undefined>>;
  setUpdatedFields: Dispatch<SetStateAction<Partial<IPOInterface> | undefined>>;
}
export default function VerdictForm({
  ipo,
  setIpo,
  setUpdatedFields,
}: VerdictFormInterface) {
  const verdictOptions: Verdict[] = [
    "STRONG_BUY",
    "BUY",
    "HOLD",
    "AVOID",
    "NOT_REVIEWED",
  ];

  const [selectedValue, setSelectedValue] = useState<Verdict | "">(
    (ipo?.verdict as Verdict) || ""
  );

  const handleVerdictChange = (value: string) => {
    const verdict = value as Verdict; // cast to enum

    setIpo((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, verdict };
      setUpdatedFields((prevUpdated) => ({
        ...prevUpdated,
        verdict: updated.verdict,
      }));
      return updated;
    });
    setSelectedValue(verdict);
  };

  return (
    <ComponentCard title="Verdict">
      <div className="flex flex-wrap items-center gap-4">
        {verdictOptions.map((option) => (
          <Radio
            key={`verdict-${option}`}
            id={`verdict-${option}`}
            name="verdict"
            value={option}
            checked={selectedValue === option}
            onChange={handleVerdictChange}
            label={option.replace("_", " ")}
          />
        ))}
      </div>
    </ComponentCard>
  );
}
