import ComponentCard from "../../../../components/common/ComponentCard";
import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import { TrashBinIcon } from "@/icons";
import { toast } from "sonner";
import { confirmDialog } from "primereact/confirmdialog";
import { UpdateIpoFormInput } from "../UpdateIpoSchema";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useState } from "react";

interface SubscriptionFormInterface {
  register: UseFormRegister<UpdateIpoFormInput>;
  setValue: UseFormSetValue<UpdateIpoFormInput>;
  errors: FieldErrors<UpdateIpoFormInput>;
  watch: UseFormWatch<UpdateIpoFormInput>;
  getValues: UseFormGetValues<UpdateIpoFormInput>;
}

export default function SubscriptionsForm({
  register,
  setValue,
  errors,
  watch,
  getValues,
}: SubscriptionFormInterface) {
  const [newSub, setNewSub] = useState({
    name: "",
    value: "",
  });

  const subscriptions = watch("subscriptions");

  const handleAddSubscription = () => {
    if (!newSub.name || newSub.value === "") {
      toast.error("Please enter a valid name and value");
      return;
    }

    if (subscriptions[newSub.name]) {
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
        const currentSubs = getValues("subscriptions") as Record<
          string,
          string
        >;

        const updatedSubs: Record<string, string> = {
          ...currentSubs,
          [newSub.name]: newSub.value,
        };

        setValue("subscriptions", updatedSubs, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setNewSub({ name: "", value: "" });
      },
      reject: () => {},
    });
  };

  const handleDeleteSubscription = (key: string) => {
    confirmDialog({
      message: `Are you sure you want to delete subscription "${key}"?`,
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Yes",
      rejectLabel: "No",
      accept: () => {
        const currentSubs = getValues("subscriptions");
        delete currentSubs[key];

        setValue("subscriptions", currentSubs, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
        toast.success("Deleted Successfully");
      },
      reject: () => {},
    });
  };
  return (
    <ComponentCard title="Subscriptions">
      <div className="space-y-6">
        {subscriptions &&
          Object.entries(subscriptions).map(([key]) => (
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
                      shouldDirty: true,
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
