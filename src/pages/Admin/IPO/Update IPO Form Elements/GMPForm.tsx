import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { GMP, IPOInterface } from "../../../../Interface/IPO";
import ComponentCard from "../../../../components/common/ComponentCard";
import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";

import DatePicker from "../../../../components/form/date-picker";
import { dateFormat } from "../../../../Helper/dateHelper";
import { TrashBinIcon } from "@/icons";

interface GMPFormInterface {
  ipo: IPOInterface | undefined;
  setIpo: Dispatch<SetStateAction<IPOInterface | undefined>>;
  setUpdatedFields: Dispatch<SetStateAction<Partial<IPOInterface> | undefined>>;
}

export default function GMPForm({
  ipo,
  setIpo,
  setUpdatedFields,
}: GMPFormInterface) {
  const [newGMP, setNewGMP] = useState<GMP>({
    gmp: undefined,
    gmpDate: undefined,
    lastUpdated: undefined,
  });

  const handleGMPChange = (index: number, field: keyof GMP, value: string) => {
    setIpo((prev) => {
      if (!prev) return prev;

      const newGmp = [...prev.gmp];
      newGmp[index] = {
        ...newGmp[index],
        [field]: field === "gmp" ? (value === "" ? "" : Number(value)) : value,
      };

      const updated = { ...prev, gmp: newGmp };
      setUpdatedFields((prevUpdated) => ({
        ...prevUpdated,
        gmp: updated.gmp,
      }));

      return updated;
    });
  };

  const handleNewGMPChange = (field: keyof GMP, value: string) => {
    setNewGMP((prev) => {
      const updated = {
        ...prev,
        [field]:
          field === "gmp" ? (value === "" ? "" : parseFloat(value)) : value,
      };
      return updated;
    });
  };

  const handleNewGMPDateChange = (selectedDates: Date[]) => {
    if (!selectedDates || selectedDates.length === 0) return;

    const selectedDate = selectedDates[0];
    const localISO = new Date(
      selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
    ).toISOString();

    setNewGMP((prev) => {
      const updated = {
        ...prev,
        gmpDate: localISO,
      };
      return updated;
    });
  };

  const handleAddGMP = () => {
    if (newGMP.gmpDate === undefined || newGMP.gmp === undefined) {
      alert("Please enter valid date and gmp");
      return;
    }
    const confirmed = window.confirm(
      `Are you sure you want to add the GMP "${dateFormat(newGMP.gmpDate)} : ${
        newGMP.gmp
      }"?`
    );
    if (!confirmed || !ipo) return;

    const formattedDate = new Date(newGMP.gmpDate).toISOString().split("T")[0];
    console.log(newGMP.gmpDate);
    console.log(formattedDate);
    const newEntry: GMP = {
      gmp: newGMP.gmp,
      gmpDate: formattedDate,
      lastUpdated: new Date().toISOString(),
    };

    console.log(newEntry);

    const updatedGmp = [...ipo.gmp, newEntry];
    setUpdatedFields((prev) => ({ ...prev, gmp: updatedGmp }));
    setIpo((prev) => (prev ? { ...prev, gmp: updatedGmp } : prev));

    setNewGMP({
      gmp: undefined,
      gmpDate: undefined,
      lastUpdated: undefined,
    });
  };

  const handleDeleteGMP = (index: number) => {
    if (!ipo) return;

    const GMPDate = ipo.gmp[index]?.gmpDate;
    const confirmed = window.confirm(
      `Are you sure you want to delete the GMP of "${dateFormat(GMPDate)}"?`
    );
    if (!confirmed) return;

    setIpo((prev) => {
      if (!prev) return prev;

      const updatedGmp = [...prev.gmp];
      updatedGmp.splice(index, 1);

      setUpdatedFields((prevUpdated) => ({
        ...prevUpdated,
        gmp: updatedGmp,
      }));

      return { ...prev, gmp: updatedGmp };
    });
  };

  return (
    <ComponentCard title="GMP">
      <div className="space-y-6">
        {ipo?.gmp?.map((g, index) => {
          return (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex-1 space-y-2">
                <DatePicker
                  id={`date-picker-${index}`}
                  value={g.gmpDate ? new Date(g.gmpDate) : undefined}
                />
                <Input
                  id={`gmp-${index}`}
                  type="number"
                  step={0.01}
                  value={g.gmp}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleGMPChange(index, "gmp", e.target.value)
                  }
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDeleteGMP(index)}
              >
                <TrashBinIcon />
              </Button>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-gray-300 space-y-3">
        <Label>Add New GMP</Label>
        <DatePicker
          id="date-picker-new"
          placeholder="Select GMP Date"
          value={newGMP.gmpDate ? new Date(newGMP.gmpDate) : undefined}
          minDate={ipo?.startDate ? new Date(ipo.startDate) : undefined}
          maxDate={ipo?.listingDate ? new Date(ipo.listingDate) : undefined}
          excludeDates={ipo?.gmp
            ?.filter((g) => g.gmpDate)
            .map((g) => new Date(g.gmpDate!))}
          onChange={handleNewGMPDateChange}
        />
        <Input
          type="number"
          placeholder="Enter GMP"
          step={0.01}
          value={newGMP.gmp !== undefined ? newGMP.gmp : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleNewGMPChange("gmp", e.target.value)
          }
        />

        <div className="flex justify-center">
          <Button variant="outline" className="w-1/2" onClick={handleAddGMP}>
            + Add GMP
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
