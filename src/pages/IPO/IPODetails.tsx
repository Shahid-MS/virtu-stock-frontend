import { dateFormat } from "../../Helper/dateHelper";
import SubscriptionRateTable from "./SubscriptionRateTable";
import { IPOProps } from "../../Interface/IPO";
import { Link, useNavigate } from "react-router";
import { INRFormat } from "../../Helper/INRHelper";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { useEffect, useState } from "react";
import apiClient from "../../API/ApiClient";

export default function IPODetails({ ipo }: IPOProps) {
  const [isApplied, setIsApplied] = useState(false);
  const [appliedIpoId, setAppliedIpoId] = useState("");
  const [lot, setLot] = useState<string>("1");
  const { isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const handleSave = async () => {
    if (!lot || isNaN(Number(lot)) || Number(lot) < 1) {
      alert("Please enter a valid lot number");
      return;
    }

    const req = {
      ipoId: ipo.id,
      appliedLot: Number(lot),
    };

    try {
      const res = await apiClient.post(`/user/apply`, req);
      setAppliedIpoId(res.data.appliedIpoId);
      alert("Marked as Applied successfully ✅");
      setIsApplied(true);
    } catch (error) {
      console.error("❌ Error applying IPO:", error);
      alert("Failed to mark as applied ❌");
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    const checkApplied = async () => {
      try {
        const res = await apiClient.get(
          `/user/check-applied-ipo?ipoId=${ipo.id}`
        );

        if (res.data.applied === true) {
          setIsApplied(true);
          setAppliedIpoId(res.data.appliedIpoId);
        }
      } catch (error) {
        console.error("Error checking applied status:", error);
      }
    };
    checkApplied();
  }, [ipo.id]);

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Bidding Dates
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {dateFormat(ipo?.startDate)}
                  <span className="mx-1 text-gray-400 dark:text-gray-500">
                    -
                  </span>
                  {dateFormat(ipo?.endDate)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Price Range
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {INRFormat(ipo?.minPrice)} - {ipo?.maxPrice}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Minimum Investment
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {INRFormat(ipo?.minPrice * ipo?.minQty)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Lot
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {ipo?.minQty}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Issue Size
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  ₹ {ipo.issueSize.totalIssueSize}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Listing Date
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {dateFormat(ipo?.listingDate)}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  GMP
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  <Link
                    to={`/ipo/gmp/${ipo?.id}`}
                    className="text-green-600 underline hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  >
                    Link
                  </Link>
                </p>
              </div>

              <div className="col-span-2 lg:col-span-4">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90 mb-2">
                  Subscription Rate
                </p>
                <SubscriptionRateTable subscription={ipo.subscriptions} />
              </div>

              <div className="col-span-2 lg:col-span-4">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  About
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {ipo?.about}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <a
              href="https://groww.in/"
              target="_blank"
              className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-xs font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <img src="\images\icons\GrowwLogo.png" className="w-4 h-4" />
              Apply Now
            </a>

            <button
              onClick={
                isApplied
                  ? () => navigate(`/user/applied-ipo/${appliedIpoId}`)
                  : openModal
              }
              className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 9.5L8.5 11.5L12 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isApplied ? "Applied" : "Mark as Applied"}
            </button>
          </div>
        </div>
        <Modal isOpen={isOpen} onClose={closeModal} showCloseButton={false}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Mark as Applied
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
}
