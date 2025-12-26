import { useState } from "react";
import { IPOInterface } from "../../../../Interface/IPO";
import ComponentCard from "../../../../components/common/ComponentCard";
import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";

import DatePicker from "../../../../components/form/date-picker";
import { dateFormat } from "../../../../Helper/dateHelper";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { UpdateIpoFormInput } from "../UpdateIpoSchema";
import { toast } from "sonner";
import { confirmDialog } from "primereact/confirmdialog";

interface GMPFormInterface {
  ipo: IPOInterface;
  register: UseFormRegister<UpdateIpoFormInput>;
  setValue: UseFormSetValue<UpdateIpoFormInput>;
  errors: FieldErrors<UpdateIpoFormInput>;
  watch: UseFormWatch<UpdateIpoFormInput>;
  getValues: UseFormGetValues<UpdateIpoFormInput>;
}

export default function GMPForm({
  ipo,
  register,
  setValue,
  errors,
  watch,
  getValues,
}: GMPFormInterface) {
  const gmp = watch("gmp");
  const [newGMP, setNewGMP] = useState({
    gmp: "",
    gmpDate: "",
  });

  const handleNewGMPDateChange = (selectedDates: Date[]) => {
    if (!selectedDates?.length) return;

    const d = selectedDates[0];
    const dateOnly = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);

    setNewGMP((prev) => ({
      ...prev,
      gmpDate: dateOnly,
    }));
  };

  const handleAddGMP = () => {
    if (!newGMP.gmpDate || newGMP.gmp === "") {
      toast.error("Please enter a valid date and gmp");
      return;
    }

    confirmDialog({
      message: `Are you sure you want to add the GMP "${dateFormat(
        newGMP.gmpDate
      )} : ${newGMP.gmp}"?`,
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Yes",
      rejectLabel: "No",
      accept: () => {
        const formattedDate = new Date(newGMP.gmpDate)
          .toISOString()
          .split("T")[0];
        const newEntry = {
          gmp: newGMP.gmp,
          gmpDate: formattedDate,
          lastUpdated: new Date().toISOString(),
        };

        const currentGmp = getValues("gmp");

        const updatedGmp = [...currentGmp, newEntry].sort(
          (a, b) =>
            new Date(b.gmpDate).getTime() - new Date(a.gmpDate).getTime()
        );

        setValue("gmp", updatedGmp, {
          shouldDirty: true,
          shouldValidate: true,
        });

        setNewGMP({ gmp: "", gmpDate: "" });
      },

      reject: () => {},
    });
  };

  return (
    <ComponentCard title="GMP">
      <div className="space-y-6">
        {gmp?.map((g, index) => {
          return (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex-1 space-y-2">
                <DatePicker
                  id={`date-picker-${index}`}
                  value={g.gmpDate ? new Date(g.gmpDate) : undefined}
                  disabled={true}
                />
                <Input
                  id={`gmp-${index}`}
                  type="text"
                  {...register(`gmp.${index}.gmp`)}
                  onChange={(e) => {
                    let val = e.target.value;
                    val = val.replace(/[^0-9.]/g, "");
                    const firstDot = val.indexOf(".");
                    if (firstDot !== -1) {
                      val =
                        val.slice(0, firstDot + 1) +
                        val.slice(firstDot + 1).replace(/\./g, "");
                    }

                    setValue(`gmp.${index}.gmp`, val, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  error={!!errors?.gmp?.[index]?.gmp}
                  hint={errors?.gmp?.[index]?.gmp?.message}
                />
              </div>
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
          type="text"
          placeholder="Enter GMP"
          value={newGMP.gmp}
          onChange={(e) => {
            let val = e.target.value.replace(/[^0-9.]/g, "");
            const firstDot = val.indexOf(".");
            if (firstDot !== -1) {
              val =
                val.slice(0, firstDot + 1) +
                val.slice(firstDot + 1).replace(/\./g, "");
            }
            setNewGMP({ ...newGMP, gmp: val });
          }}
        />

        <div className="flex justify-center">
          <Button variant="outline" className="w-1/2" onClick={handleAddGMP}>
            + Add
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
