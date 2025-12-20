import apiClient from "@/API/ApiClient";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { dateFormat } from "@/Helper/dateHelper";
import { INRFormat } from "@/Helper/INRHelper";
import { useModal } from "@/hooks/useModal";
import { AppliedIPOInterface } from "@/Interface/IPO";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface AppliedIPODetailsInterface {
  appliedIpo: AppliedIPOInterface;
  setAppliedIpo: Dispatch<SetStateAction<AppliedIPOInterface | undefined>>;
}
type UpdateAllotedIpoRequest = {
  lot?: number;
  sellPrice?: number | null;
};
const AllotmentIPOdetail = ({
  appliedIpo,
  setAppliedIpo,
}: AppliedIPODetailsInterface) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [lot, setLot] = useState<string>(
    String(appliedIpo.allotedIpo.allotedLot)
  );
  const [sellPrice, setSellPrice] = useState<string>(
    String(
      appliedIpo.allotedIpo.sellPrice === null
        ? "N/A"
        : appliedIpo.allotedIpo.sellPrice
    )
  );

  const handleSave = async () => {
    if (!lot || isNaN(Number(lot)) || Number(lot) < 1) {
      toast.error("Please enter a valid lot number");
      return;
    }
    if (Number(lot) > appliedIpo.appliedLot) {
      toast.error("Alloted lot can't  be greater than applied lot");
      return;
    }

    if (sellPrice !== "N/A" && (!sellPrice || isNaN(Number(sellPrice)))) {
      toast.error("Please enter a valid sellPrice or N/A if not sold yet");
      return;
    }

    const lotChanged = Number(lot) !== appliedIpo.allotedIpo.allotedLot;
    const sellPriceChanged =
      Number(sellPrice) !== appliedIpo.allotedIpo.sellPrice;

    if (!lotChanged && !sellPriceChanged) {
      toast.error("No changes made.");
      return;
    }

    const req: UpdateAllotedIpoRequest = {};
    if (lotChanged) {
      req.lot = Number(lot);
    }

    if (sellPriceChanged) {
      req.sellPrice = sellPrice == "N/A" ? null : Number(sellPrice);
    }

    try {
      const res = await apiClient.patch(
        `user/alloted-ipo/${appliedIpo.allotedIpo.id}`,
        req
      );
      toast.success(res.data.message);
      setAppliedIpo((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          appliedLot: Number(lot),
          allotedIpo: res.data.alloted,
        };
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <div className="order-1">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          Alloted Date
        </p>
        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
          {dateFormat(appliedIpo.allotedIpo.allotedDate)}
        </p>
      </div>

      <div className="order-1">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          Alloted Lot
        </p>
        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
          {appliedIpo.allotedIpo.allotedLot}
        </p>
      </div>
      <div className="order-1 ">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          Price Range
        </p>
        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
          {INRFormat(appliedIpo.ipo.minPrice)} -
          {INRFormat(appliedIpo.ipo.maxPrice)}
        </p>
      </div>
      {Date.now() >= new Date(appliedIpo.ipo.listingDate).getTime() && (
        <>
          <div className="order-2">
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Listed Price
            </p>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              {INRFormat(appliedIpo.ipo.listedPrice)}
            </p>
          </div>
          <div className="order-2">
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Listing Return
            </p>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              {INRFormat(appliedIpo.ipo.listingReturn)}
            </p>
          </div>

          <div className="order-2 lg:col-span-2">
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Listing Return %
            </p>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              {appliedIpo.ipo.listingReturnPercent} %
            </p>
          </div>
          <div className="order-2">
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Sell Price
            </p>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              {appliedIpo.allotedIpo.sellPrice !== null
                ? appliedIpo.allotedIpo.sellPrice
                : "Yet Not sold"}
            </p>
          </div>
          <div className="order-2">
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Return
            </p>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              {INRFormat(appliedIpo.allotedIpo.netReturn)}
            </p>
          </div>

          <div className="order-2 lg:col-span-2">
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Return %
            </p>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              {appliedIpo.allotedIpo.netReturnPercent} %
            </p>
          </div>

          <div className="order-2">
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Total Return
            </p>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              {INRFormat(
                appliedIpo.allotedIpo.netReturn *
                  appliedIpo.allotedIpo.allotedLot *
                  appliedIpo.ipo.minQty
              )}
            </p>
          </div>
        </>
      )}

      <div className="flex flex-col items-center gap-3 col-span-2 lg:col-span-1 mb-2 order-last lg:order-1">
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
                Edit Alloted IPO
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
                {Date.now() >=
                  new Date(appliedIpo.ipo.listingDate).getTime() && (
                  <div>
                    <Label>Sell Price</Label>
                    <Input
                      type="text"
                      placeholder="Price"
                      value={sellPrice}
                      required
                      onChange={(e) => setSellPrice(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex items-center justify-end gap-3">
                  <Button size="sm" variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    Save
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

export default AllotmentIPOdetail;
