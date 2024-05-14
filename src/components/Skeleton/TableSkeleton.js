import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableSkeleton = ({ colSize }) => {
  return (
    <SkeletonTheme
      baseColor="rgba(51,65,85,0.6)"
      highlightColor="rgba(51,65,85,0.4)"
    >
      {[...new Array(6)].map((c, index) => {
        return (
          <tr
            key={`table-skeleton-${index.toString()}`}
            className={`${
              index % 2 === 0
                ? "dark:bg-slate-700/80 bg-gray-200"
                : "dark:bg-slate-600/80 bg-gray-100"
            } hover:bg-red-200/90 dark:hover:bg-amber-600/10`}
          >
            {[...new Array(colSize)].map((c, index) => {
              return (
                <td
                  key={`table-skeleton-td-${index.toString()}`}
                  className="whitespace-nowrap text-sm font-medium dark:text-gray-300 text-slate-700"
                >
                  <Skeleton
                    width={"100%"}
                    height={40}
                    borderRadius={4}
                    className={"mr-2 my-2"}
                    count={1}
                  />
                </td>
              );
            })}
          </tr>
        );
      })}
    </SkeletonTheme>
  );
};

export default TableSkeleton;
