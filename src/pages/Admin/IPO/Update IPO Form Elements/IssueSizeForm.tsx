import { Dispatch, SetStateAction, useEffect } from "react";
import { IPOInterface, issueSize } from "../../../../Interface/IPO";
import ComponentCard from "../../../../components/common/ComponentCard";
import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { updateIpoSchemaSchemaType } from "../UpdateIpoSchema";

interface IssueSizeFormInterface {
  ipo: IPOInterface | undefined;
  setIpo: Dispatch<SetStateAction<IPOInterface | undefined>>;
  register: UseFormRegister<updateIpoSchemaSchemaType>;
  setValue: UseFormSetValue<updateIpoSchemaSchemaType>;
  errors: FieldErrors<updateIpoSchemaSchemaType>;
}

export default function IssueSizeForm({
  register,
  setValue,
  errors,
  ipo,
}: IssueSizeFormInterface) {
  const issueSizeFields: {
    id: string;
    label: string;
    field: keyof issueSize;
  }[] = [
    { id: "fresh", label: "Fresh", field: "fresh" },
    { id: "ofs", label: "Offer For Sale", field: "offerForSale" },
    { id: "total", label: "Total Issue Size", field: "totalIssueSize" },
  ];

  useEffect(() => {
    if (ipo?.issueSize) {
      setValue("issueSize.fresh", ipo.issueSize.fresh);
      setValue("issueSize.offerForSale", ipo.issueSize.offerForSale);
      setValue("issueSize.totalIssueSize", ipo.issueSize.totalIssueSize);
    }
  }, [ipo, setValue]);

  return (
    <ComponentCard title="Issue Size">
      <div className="space-y-6">
        {issueSizeFields.map(({ id, label, field }) => (
          <div key={id} className="flex items-center space-x-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                type="string"
                {...register(`issueSize.${field}`)}
                onChange={(e) =>
                  setValue(`issueSize.${field}`, e.target.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                error={!!errors?.issueSize?.[field]}
                hint={errors?.issueSize?.[field]?.message}
              />
            </div>
          </div>
        ))}
      </div>
    </ComponentCard>
  );
}
