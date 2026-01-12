import { useEffect, useState } from "react";
import UserInfoCard from "./UserInfoCard";
import UserMetaCard from "./UserMetaCard";
import { UserInterface } from "@/Interface/IPO";
import apiClient from "@/API/ApiClient";
import Loading from "@/pages/OtherPage/Loading";
import NotFound from "@/pages/OtherPage/NotFound";

export default function UserProfile() {
  const [user, setUser] = useState<UserInterface>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await apiClient.get(`/user`);
        setUser(res.data);
      } catch {
        setUser(undefined);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 250);
      }
    };
    fetchUserDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (user === undefined || user === null) {
    return <NotFound />;
  }
  return (
    <>
      <div className="space-y-6">
        <UserMetaCard user={user} />
        <UserInfoCard user={user} setUser={setUser} />
      </div>
    </>
  );
}
