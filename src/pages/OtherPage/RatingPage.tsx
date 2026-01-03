/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "@/API/ApiClient";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { RootState } from "@/Store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { Rating } from "primereact/rating";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { toast } from "sonner";

interface RatingInterface {
  averageRating: number;
  totalUsers: number;
  distribution: Record<string, number>;
}

const RatingPage = () => {
  const [myRating, setMyRating] = useState<number>(0);
  const [newRating, setNewRating] = useState<number>(0);
  const { token } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  let roles: string[] = [];
  if (token) {
    const decoded = jwtDecode<{ roles: string[] }>(token);
    roles = decoded.roles;
  }

  const fetchRating = async (): Promise<RatingInterface> => {
    const res = await apiClient.get("/feedback/rating");
    return res.data;
  };

  const fetchMyRating = async () => {
    const res = await apiClient.get("/user/rating");
    return res.data;
  };

  const submitRating = async (rating: number) => {
    const res = await apiClient.post("/user/rating", { rating });
    return res.data;
  };

  const { data: rating } = useQuery<RatingInterface>({
    queryKey: ["rating"],
    queryFn: fetchRating,
    retry: 1,
  });

  const { data: myRate } = useQuery({
    queryKey: ["my-rating"],
    queryFn: fetchMyRating,
    retry: false,
  });

  const { mutate: rate, isPending } = useMutation({
    mutationFn: submitRating,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["my-rating"] });
      queryClient.invalidateQueries({ queryKey: ["rating"] });
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to Rate");
    },
  });

  useEffect(() => {
    setMyRating(!myRate ? 0 : myRate.rating);
    setNewRating(myRating);
  }, [myRate, myRating]);

  return (
    <ComponentCard title="Rating">
      <div className="space-y-6">
        {Object.entries(rating?.distribution ?? {})
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([star, count]) => (
            <div key={star} className="flex justify-between items-center">
              <Rating value={Number(star)} disabled cancel={false} />
              <p>{count}</p>
            </div>
          ))}

        <div>
          <Label className="text-lg font-bold">Average Rating</Label>
          <div className="flex justify-between items-center">
            <Rating
              value={rating?.averageRating ?? 0}
              disabled
              cancel={false}
            />
            <p>{rating?.totalUsers ?? 0}</p>
          </div>
        </div>

        {roles.includes("ROLE_USER") && (
          <div className="space-y-6 flex flex-col">
            <Label className="text-bold">My Rating</Label>
            <Rating
              value={newRating}
              onChange={(e) => setNewRating(e.value)}
              cancel={false}
            />
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={async () => rate(newRating)}
                disabled={isPending || myRating === newRating}
              >
                {isPending
                  ? "Submitting..."
                  : myRating != 0
                  ? "Update Rate"
                  : "Rate Now"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ComponentCard>
  );
};

export default RatingPage;
