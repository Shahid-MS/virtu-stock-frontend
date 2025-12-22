import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IPOInterface } from "../../../../Interface/IPO";
import ComponentCard from "../../../../components/common/ComponentCard";
import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";

import DatePicker from "../../../../components/form/date-picker";
import { dateFormat } from "../../../../Helper/dateHelper";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { updateIpoSchemaSchemaType } from "../UpdateIpoSchema";
import { toast } from "sonner";
import { confirmDialog } from "primereact/confirmdialog";

interface GMPFormInterface {
  ipo: IPOInterface | undefined;
  setIpo: Dispatch<SetStateAction<IPOInterface | undefined>>;
  register: UseFormRegister<updateIpoSchemaSchemaType>;
  setValue: UseFormSetValue<updateIpoSchemaSchemaType>;
  errors: FieldErrors<updateIpoSchemaSchemaType>;
  watch: UseFormWatch<updateIpoSchemaSchemaType>;
}

export default function GMPForm({
  ipo,
  setIpo,
  register,
  setValue,
  errors,
  watch,
}: GMPFormInterface) {
  const [newGMP, setNewGMP] = useState({
    gmp: "",
    gmpDate: "",
  });

  useEffect(() => {
    if (!ipo?.gmp) return;

    setValue(
      "gmp",
      ipo.gmp.map((g) => ({
        gmpDate: g.gmpDate,
        gmp: String(g.gmp),
      })),
      { shouldDirty: false }
    );
  }, [ipo, setValue]);

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

    if (!ipo) return;

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

        const gmpFromForm = watch("gmp");

        const updatedGmp = [...gmpFromForm, newEntry].sort(
          (a, b) =>
            new Date(a.gmpDate).getTime() - new Date(b.gmpDate).getTime()
        );

        setIpo({ ...ipo, gmp: updatedGmp });

        setNewGMP({ gmp: "", gmpDate: "" });
      },

      reject: () => {},
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
