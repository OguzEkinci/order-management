import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ShowcaseSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#fed7aa" highlightColor="#fdba74">
      <Skeleton
        width={window.innerWidth < 350 ? window.innerWidth - 250 : 350}
        height={25}
        borderRadius={4}
        className={"mr-2 my-2"}
        count={1}
      />

      <div className="flex-row hidden md:flex">
        {[...new Array(10)].map((c, h) => {
          return (
            <Skeleton
              width={window.innerWidth / 20}
              height={window.innerHeight / 16}
              borderRadius={4}
              className={"mr-2 my-2"}
              count={10}
            />
          );
        })}
      </div>

      <div className="flex-row flex sm:hidden">
        {[...new Array(10)].map((c, h) => {
          return (
            <Skeleton
              width={window.innerWidth / 12.5}
              height={window.innerHeight / 20}
              borderRadius={4}
              className={"mr-2 my-2"}
              count={10}
            />
          );
        })}
      </div>
    </SkeletonTheme>
  );
};

export default ShowcaseSkeleton;
