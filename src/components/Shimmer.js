import { CircularProgress } from "@mui/material";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Shimmer = () => {
  return (
    <div className="flex mt-10">
    <CircularProgress/>&nbsp;&nbsp;&nbsp;
   <p className="font-bold text-xl">Loading...</p>
   </div>
  );
};

export default Shimmer;
