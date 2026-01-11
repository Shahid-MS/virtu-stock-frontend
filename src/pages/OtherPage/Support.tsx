import Community from "./Community";
import QueryPage from "./QueryPage";
import RatingPage from "./RatingPage";

const Support = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="lg:col-span-2">
          <Community />
        </div>
        <div className="space-y-6">
          <RatingPage />
        </div>
        <div className="space-y-6">
          <QueryPage />
        </div>
      </div>
    </>
  );
};

export default Support;
