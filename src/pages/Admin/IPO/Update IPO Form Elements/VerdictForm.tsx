import ComponentCard from "../../../../components/common/ComponentCard";
import Radio from "../../../../components/form/input/Radio";
import { Verdict } from "../../../../Enum/Verdict";

import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { UpdateIpoFormInput } from "../UpdateIpoSchema";

interface VerdictFormInterface {
  register: UseFormRegister<UpdateIpoFormInput>;
  setValue: UseFormSetValue<UpdateIpoFormInput>;
  watch: UseFormWatch<UpdateIpoFormInput>;
}
export default function VerdictForm({
  watch,
  register,
  setValue,
}: VerdictFormInterface) {
  const verdictOptions: Verdict[] = [
    "STRONG_BUY",
    "BUY",
    "WAIT",
    "AVOID",
    "NOT_REVIEWED",
  ];

  const selectedValue = watch("verdict");

  return (
    <ComponentCard title="Verdict">
      <div className="flex flex-wrap items-center gap-4">
        {verdictOptions.map((option) => (
          <Radio
            key={`verdict-${option}`}
            id={`verdict-${option}`}
            value={option}
            checked={selectedValue === option}
            label={option.replace("_", " ")}
            {...register("verdict")}
            onChange={() => {
              setValue("verdict", option, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
          />
        ))}
      </div>
    </ComponentCard>
  );
}
