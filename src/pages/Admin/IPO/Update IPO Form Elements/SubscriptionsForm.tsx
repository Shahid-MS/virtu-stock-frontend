import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { IPOInterface, Subscription } from "../../../../Interface/IPO";
import ComponentCard from "../../../../components/common/ComponentCard";
import Label from "../../../../components/form/Label";
import Input from "../../../../components/form/input/InputField";
import Button from "../../../../components/ui/button/Button";
import { DeleteIcon } from "../../../../icons";

interface SubscriptionFormInterface {
  ipo: IPOInterface | undefined;
  setIpo: Dispatch<SetStateAction<IPOInterface | undefined>>;
  setUpdatedFields: Dispatch<SetStateAction<Partial<IPOInterface> | undefined>>;
}

export default function SubscriptionsForm({
  ipo,
  setIpo,
  setUpdatedFields,
}: SubscriptionFormInterface) {
  const [newSub, setNewSub] = useState<Subscription>({
    name: "",
    subsvalue: undefined,
  });

  const handleSubscriptionsChange = (
    index: number,
    field: keyof Subscription,
    value: string
  ) => {
    setIpo((prev) => {
      if (!prev) return prev;

      const newSubscriptions = [...prev.subscriptions];
      newSubscriptions[index] = {
        ...newSubscriptions[index],
        [field]:
          field === "subsvalue" ? (value === "" ? "" : Number(value)) : value,
      };
      const updated = { ...prev, subscriptions: newSubscriptions };
      setUpdatedFields((prevUpdated) => ({
        ...prevUpdated,
        subscriptions: updated.subscriptions,
      }));
      return updated;
    });
  };

  const handleNewSubChange = (field: keyof Subscription, value: string) => {
    setNewSub((prev) => ({
      ...prev,
      [field]:
        field === "subsvalue" ? (value === "" ? "" : parseFloat(value)) : value,
    }));
  };

  const handleAddSubscription = () => {
    if (!newSub.name || newSub.subsvalue === undefined) {
      alert("Please enter a valid subscription name and value");
      return;
    }

    if (!ipo) return;

    const confirmed = window.confirm(
      `Are you sure you want to add the subscription "${newSub.name} : ${newSub.subsvalue}"?`
    );
    if (!confirmed) return;

    setIpo((prev) =>
      prev ? { ...prev, subscriptions: [...prev.subscriptions, newSub] } : prev
    );

    setUpdatedFields((prev) => ({
      ...prev,
      subscriptions: ipo ? [...ipo.subscriptions, newSub] : [newSub],
    }));

    setNewSub({
      name: "",
      subsvalue: undefined,
    });
  };

  const handleDeleteSubscription = (index: number) => {
    if (!ipo) return;

    const subscriptionName = ipo.subscriptions[index]?.name;
    const confirmed = window.confirm(
      `Are you sure you want to delete the subscription "${subscriptionName}"?`
    );
    if (!confirmed) return;

    setIpo((prev) => {
      if (!prev) return prev;

      const updatedSubs = [...prev.subscriptions];
      updatedSubs.splice(index, 1);

      setUpdatedFields((prevUpdated) => ({
        ...prevUpdated,
        subscriptions: updatedSubs,
      }));

      return { ...prev, subscriptions: updatedSubs };
    });
  };

  return (
    <ComponentCard title="Subscriptions">
      <div className="space-y-6">
        {ipo?.subscriptions?.map((s, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor={`subs-${index}`}>{s.name}</Label>
              <Input
                id={`subs-${index}`}
                type="number"
                step={0.01}
                min="0"
                value={s.subsvalue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSubscriptionsChange(index, "subsvalue", e.target.value)
                }
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDeleteSubscription(index)}
            >
              <DeleteIcon />
            </Button>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-300 space-y-3">
        <Label>Add New Subscription</Label>
        <Input
          type="text"
          placeholder="Enter name"
          value={newSub.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleNewSubChange("name", e.target.value)
          }
        />

        <Input
          type="number"
          placeholder="Enter value"
          min="0"
          step={0.01}
          value={newSub.subsvalue || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleNewSubChange("subsvalue", e.target.value)
          }
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
