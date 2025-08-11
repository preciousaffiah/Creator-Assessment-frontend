import DataPagination from "@/components/creator-ui/Pagination";
import { FolderOpen, Loader, RefreshCcw } from "lucide-react";

const TransferHistory = ({ itemsData, isItemsLoading, isItemsRefetching, page, setPage, itemsRefetch, isRefetching }: any) => {

  return (
    <div className="flex gap-y-6 px-0 flex-col w-full h-full">
      <div className="pt-4 rounded-md md:px-3 px-0 gap-y-10 flex pb-4 gap-x-4 flex-col">
        <div className="flex pb-4 flex-col bg-primaryDark pt-4 rounded-md">
          <div className="pt-4 rounded-t-md px-3 flex pb-4 border-b border-primary-border">
            <div className="flex justify-between w-full">
              <p className="capitalize text-lg font-medium text-secondaryBorder">
                Transaction History
              </p>
              <RefreshCcw className={`w-4 cursor-pointer capitalize text-lg font-medium text-secondaryBorder ${isItemsRefetching ? "rotate-icon" : ""}`} onClick={() => itemsRefetch()} />
            </div>
          </div>

          {itemsData &&
            !isItemsLoading &&
            !isItemsRefetching &&
            itemsData.pagination.total_transactions > 0 && (
              <>
                {itemsData?.transactions
                  .map((transaction: any, index: number) => (
                    <div className="text-white flex gap-x-3 px-3 py-2 items-center">
                      <p>{index + 1}.</p>
                      <p>{transaction.counterpart_user_name} - </p>
                      <p className="italic">{transaction.description}</p>
                      <p className="text-sm">{new Date(transaction?.created_at).toLocaleDateString()}</p>
                      {
                        transaction.mode === "debit" ?
                          <span className="text-red-500">- ${transaction.amount.toFixed(2)}</span>
                          :
                          <span className="text-green-500">+ ${transaction.amount.toFixed(2)}</span>
                      }
                      <p className={`${transaction.mode === "debit" ? "bg-red-600/20 text-red-500" : "bg-green-600/20 text-green-500"} capitalize px-3 rounded-lg`}>{transaction.mode}</p>
                    </div>
                  ))}

                <DataPagination
                  currentPage={page}
                  setCurrentPage={setPage}
                  refetch={itemsRefetch}
                  total_items={itemsData.pagination.total_transactions}
                  total_pages={itemsData.pagination.total_pages}
                  items_per_page={itemsData.pagination.perPage}
                  current_item_count={itemsData.pagination.total_transactions} // Total number of items matching the filter
                />
              </>
            )}

          {itemsData?.currentItemCount < 1 &&
            !isRefetching &&
            !isItemsLoading && (
              <div className="text-txWhite h-[18rem] m-auto flex flex-col justify-center items-center font-medium text-lg font-edu">
                <FolderOpen />
                Empty
              </div>
            )}

          {(isItemsLoading || isItemsRefetching) && (
            <div className="text-txWhite h-[18rem] m-auto flex flex-col justify-center items-center font-medium text-lg font-edu">
              <Loader className="rotate-icon size-8" />
              Loading
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferHistory;