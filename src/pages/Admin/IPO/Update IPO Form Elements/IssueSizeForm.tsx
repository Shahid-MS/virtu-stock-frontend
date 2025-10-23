import { ChangeEvent, Dispatch, SetStateAction} from "react";
import { IPOInterface, issueSize } from "../../../../Interface/IPO";
import ComponentCard from "../../../../components/common/ComponentCard";
import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";

interface IssueSizeFormInterface {
  ipo: IPOInterface | undefined;
  setIpo: Dispatch<SetStateAction<IPOInterface | undefined>>;
  setUpdatedFields: Dispatch<SetStateAction<Partial<IPOInterface> | undefined>>;
}

export default function IssueSizeForm({
  ipo,
  setIpo,
  setUpdatedFields,
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
  const handleChangeIssueSize = (field: keyof issueSize, value: string) => {
    setIpo((prev) => {
      if (!prev) return prev;

      const updatedIssueSize = {
        ...prev.issueSize,
        [field]: value,
      };
      const updated = { ...prev, issueSize: updatedIssueSize };

      setUpdatedFields((prevUpdated) => ({
        ...prevUpdated,
        issueSize: updatedIssueSize,
      }));
      return updated;
    });
  };

  return (
    <ComponentCard title="Issue">
      <div className="space-y-6">
        {issueSizeFields.map(({ id, label, field }) => (
          <div key={id} className="flex items-center space-x-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                type="string"
                value={ipo?.issueSize[field] || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeIssueSize(field, e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </ComponentCard>
  );
}
