import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Trash2, X } from "lucide-react";
import { RequestType } from "@/types/participation";
import {
  useAcceptUserRequests,
  useDeleteUserRequests,
} from "@/react-query/mutation/requests";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/react-query/query/enum";

type BillsType = {
  bills: RequestType[] | undefined;
};

const BillsRequests = (bills: BillsType) => {
  const billsList = bills?.bills;
  const queryClient = useQueryClient();
  const { mutate: reject } = useDeleteUserRequests();
  const { mutate: accept } = useAcceptUserRequests();

  const handleReject = (id: number) => {
    reject(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_REQUESTS],
        });
      },
    });
  };

  const handleAccept = (id: number) => {
    accept(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_REQUESTS],
        });
      },
    });
  };

  return (
    <div>
      <div className="w-4/5 mx-auto">
        <Card className="w-full rounded-2xl px-4">
          <CardHeader className=" border-b">
            <CardTitle>მოთხოვნები კომუნალურის თანამონაწილეობაზე</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="flex flex-col">
              <div className="grid grid-cols-5 border-b gap-6 py-2 px-6  text-gray-800 text-sm cursor-pointer font-primaryMedium">
                <div>დასახელება</div>
                <div>აბონენტის ნომერი</div>
                <div>გადახდის თარიღი</div>
                <div>მომთხოვნის ვინაობა</div>

                <div></div>
              </div>
            </div>
            {billsList?.map((b: RequestType) => (
              <div
                key={`bil${b.id}`}
                className="grid grid-cols-5 border-b items-center gap-6 py-4 px-6 hover:bg-gray-50 transition-all text-gray-600 cursor-pointer font-primaryMedium"
              >
                <div className="text-gray-900">{b.utility_details?.name}</div>
                <div>{b.utility_details?.subscriber_number}</div>
                <div>{b.utility_details?.due_date}</div>
                <div>{b.utility_details?.owner}</div>
                <div className="flex flex-row gap-4 justify-end">
                  {b.status === "pending" ? (
                    <>
                      <div title="თანხმობა">
                        <Check
                          className="text-green-700"
                          onClick={() => handleAccept(b.id)}
                        />
                      </div>
                      <div title="უარი">
                        <X
                          className="text-red-700"
                          onClick={() => handleReject(b.id)}
                        />
                      </div>
                    </>
                  ) : (
                    <div title="უარი">
                      <Trash2
                        className="text-red-700"
                        onClick={() => handleReject(b.id)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end px-0"></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BillsRequests;
