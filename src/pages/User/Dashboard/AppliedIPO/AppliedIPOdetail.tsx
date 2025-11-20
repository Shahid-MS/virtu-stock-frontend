import apiClient from "@/API/ApiClient";
import Input from "@/components/form/input/InputField";
import Radio from "@/components/form/input/Radio";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { AllotmentStatus } from "@/Enum/AllotmentStatus";
import { dateFormat } from "@/Helper/dateHelper";
import { useModal } from "@/hooks/useModal";
import { AppliedIPOInterface } from "@/Interface/IPO";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router";

interface AppliedIPODetailsInterface {
  appliedIpo: AppliedIPOInterface;
  setAppliedIpo: Dispatch<SetStateAction<AppliedIPOInterface | undefined>>;
}

type UpdateAppliedIpoRequest = {
  lot?: number;
  allotment?: AllotmentStatus;
};
const AppliedIPOdetail = ({
  appliedIpo,
  setAppliedIpo,
}: AppliedIPODetailsInterface) => {
  const AllotmentOptions: AllotmentStatus[] = [
    AllotmentStatus.ALLOTED,
    AllotmentStatus.NOT_ALLOTED,
  ];
  const [selectedAllotmentStatus, setSelectedAllotmentStatus] =
    useState<AllotmentStatus>(appliedIpo.allotment as AllotmentStatus);

  const { isOpen, openModal, closeModal } = useModal();
  const [lot, setLot] = useState<string>(String(appliedIpo.appliedLot));
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!lot || isNaN(Number(lot)) || Number(lot) < 1) {
      alert("Please enter a valid lot number");
      return;
    }

    const lotChanged = Number(lot) !== appliedIpo.appliedLot;
    const allotmentChanged =
      appliedIpo.allotment !== AllotmentStatus.ALLOTMENT_PENDING &&
      selectedAllotmentStatus !== appliedIpo.allotment;

    if (!lotChanged && !allotmentChanged) {
      alert("No changes made.");
      return;
    }

    const req: UpdateAppliedIpoRequest = {};
    if (lotChanged) {
      req.lot = Number(lot);
    }

    if (allotmentChanged) {
      req.allotment = selectedAllotmentStatus;
    }

    try {
      const res = await apiClient.patch(
        `user/applied-ipo/${appliedIpo.id}`,
        req
      );
      console.log(res.data.allotedIpo);
      alert("Updated successfully ✅");
      setAppliedIpo((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          appliedLot: Number(lot),
          allotment: selectedAllotmentStatus,
          allotedIpo: res.data.allotedIpo,
        };
      });
    } catch (error) {
      console.error("❌ Error applying IPO:", error);
      alert("Failed to Update ❌");
    } finally {
      closeModal();
    }
  };

  const handleNotApplied = async () => {
    const confirmNotApplied = window.confirm(
      `Are you sure you have not applied to ${appliedIpo?.ipo.name} ?`
    );
    if (!confirmNotApplied) return;
    try {
      await apiClient.delete(
        `/user/unmark-as-applied?ipoId=${appliedIpo.ipo.id}`
      );
      navigate(-1);
    } catch (error) {
      console.error("Error unmarking applied status:", error);
    }
  };

  const handleAllotmentStatusChange = (value: string) => {
    const allotmentStatus = value as AllotmentStatus;
    setSelectedAllotmentStatus(allotmentStatus);
  };
  return (
    <>
      <div>
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          Applied Date
        </p>
        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
          {dateFormat(appliedIpo.appliedDate)}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          Applied Lot
        </p>
        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
          {appliedIpo.appliedLot}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          Allotment Status
        </p>
        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
          {appliedIpo.allotment.replace("_", " ")}
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 col-span-2 lg:col-span-1 mb-2">
        <button
          onClick={openModal}
          className="flex w-1/2 sm:w-1/4 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
        <Modal isOpen={isOpen} onClose={closeModal} showCloseButton={false}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Edit Applied IPO
              </h3>

              <form className="flex flex-col gap-5">
                <div>
                  <Label>Enter Lot</Label>
                  <Input
                    type="text"
                    placeholder="number of lots"
                    value={lot}
                    required
                    onChange={(e) => setLot(e.target.value)}
                  />
                </div>
                {appliedIpo.allotment !== AllotmentStatus.ALLOTMENT_PENDING && (
                  <div className="flex flex-wrap items-center gap-4">
                    {AllotmentOptions.map((option) => (
                      <Radio
                        key={`allotment-${option}`}
                        id={`allotment-${option}`}
                        name="allotment"
                        value={option}
                        checked={selectedAllotmentStatus === option}
                        onChange={handleAllotmentStatusChange}
                        label={option.replace("_", " ")}
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-end gap-3">
                  <Button size="sm" variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleNotApplied}
                    className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    Not Applied
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AppliedIPOdetail;
