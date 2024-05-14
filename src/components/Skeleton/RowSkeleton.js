import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RowSkeleton = ({ colSize }) => {
  return (
    <SkeletonTheme
      baseColor="rgba(51,65,85,0.6)"
      highlightColor="rgba(51,65,85,0.4)"
    >
      <Skeleton
        width={"60%"}
        height={14}
        borderRadius={4}
        className={"mr-2 my-2"}
        count={1}
      />
    </SkeletonTheme>
  );
};

export default RowSkeleton;
