import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IPOInterface } from "../../../../Interface/IPO";
import ComponentCard from "../../../../components/common/ComponentCard";
import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import { TrashBinIcon } from "@/icons";
import { toast } from "sonner";
import { confirmDialog } from "primereact/confirmdialog";
import { updateIpoSchemaSchemaType } from "../UpdateIpoSchema";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface SubscriptionFormInterface {
  ipo: IPOInterface | undefined;
  setIpo: Dispatch<SetStateAction<IPOInterface | undefined>>;
  register: UseFormRegister<updateIpoSchemaSchemaType>;
  setValue: UseFormSetValue<updateIpoSchemaSchemaType>;
  errors: FieldErrors<updateIpoSchemaSchemaType>;
}

export default function SubscriptionsForm({
  ipo,
  setIpo,
  register,
  setValue,
  errors,
}: SubscriptionFormInterface) {
  const [newSub, setNewSub] = useState({
    name: "",
    value: "",
  });

  useEffect(() => {
    if (!ipo?.subscriptions) return;

    Object.entries(ipo.subscriptions).forEach(([key, value]) => {
      setValue(`subscriptions.${key}`, String(value));
    });
  }, [ipo]);

  const handleAddSubscription = () => {
    if (!newSub.name || newSub.value === "") {
      toast.error("Please enter a valid name and value");
      return;
    }

    if (!ipo) return;

    if (ipo.subscriptions[newSub.name]) {
      toast.error("Subscription already exists");
      return;
    }

    confirmDialog({
      message: `Add subscription "${newSub.name}"?`,
      header: "Confirm Action",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Yes",
      rejectLabel: "No",
      accept: () => {
        const updatedSubs = {
          ...ipo.subscriptions,
          [newSub.name]: newSub.value,
        };

        setIpo({ ...ipo, subscriptions: updatedSubs });
        setNewSub({ name: "", value: "" });
      },
      reject: () => {},
    });
  };

  const handleDeleteSubscription = (key: string) => {
    if (!ipo) return;

    confirmDialog({
      message: `Are you sure you want to delete subscription "${key}"?`,
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Yes",
      rejectLabel: "No",
      accept: () => {
        const updatedSubs = { ...ipo.subscriptions };
        delete updatedSubs[key];
        setIpo((prev) =>
          prev ? { ...prev, subscriptions: updatedSubs } : prev
        );
        setValue("subscriptions", updatedSubs, { shouldValidate: true });
        toast.success("Deleted Successfully");
      },
      reject: () => {},
    });
  };
  return (
    <ComponentCard title="Subscriptions">
      <div className="space-y-6">
        {ipo &&
          Object.entries(ipo.subscriptions).map(([key]) => (
            <div key={key} className="flex items-center space-x-2">
              <div className="flex-1 space-y-2">
                <Label>{key}</Label>

                <Input
                  type="text"
                  placeholder="Enter value"
                  {...register(`subscriptions.${key}`)}
                  onChange={(e) => {
                    let val = e.target.value;
                    val = val.replace(/[^0-9.]/g, "");
                    const firstDot = val.indexOf(".");
                    if (firstDot !== -1) {
                      val =
                        val.slice(0, firstDot + 1) +
                        val.slice(firstDot + 1).replace(/\./g, "");
                    }
                    setValue(`subscriptions.${key}`, val, {
                      shouldValidate: true,
                    });
                  }}
                  error={!!errors?.subscriptions?.[key]}
                  hint={errors?.subscriptions?.[key]?.message}
                />
              </div>

              {key !== "QIB" &&
                key !== "Non-Institutional" &&
                key !== "Retailer" &&
                key !== "Total" && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDeleteSubscription(key)}
                  >
                    <TrashBinIcon />
                  </Button>
                )}
            </div>
          ))}
      </div>

      <div className="pt-4 border-t border-gray-300 space-y-3">
        <Label>Add New Subscription</Label>
        <Input
          type="text"
          placeholder="Enter name"
          value={newSub.name}
          onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
        />

        <Input
          type="text"
          placeholder="Enter value"
          value={newSub.value}
          onChange={(e) => {
            let val = e.target.value.replace(/[^0-9.]/g, "");
            const firstDot = val.indexOf(".");
            if (firstDot !== -1) {
              val =
                val.slice(0, firstDot + 1) +
                val.slice(firstDot + 1).replace(/\./g, "");
            }
            setNewSub({ ...newSub, value: val });
          }}
        />
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="w-1/2"
            onClick={handleAddSubscription}
          >
            + Add Subscription
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
