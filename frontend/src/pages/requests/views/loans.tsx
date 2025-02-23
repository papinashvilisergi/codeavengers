import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Trash2, X } from "lucide-react";
import { RequestType } from "@/types/participation";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAcceptUserRequests,
  useDeleteUserRequests,
} from "@/react-query/mutation/requests";
import { QUERY_KEYS } from "@/react-query/query/enum";

type LoansType = {
  loans: RequestType[] | undefined;
};

const LoansRequests = (loans: LoansType) => {
  const loansList = loans?.loans;
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
            <CardTitle>მოთხოვნები სესხის თანამონაწილეობაზე</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="flex flex-col">
              <div className="grid grid-cols-9 border-b gap-8 py-2 px-6  text-gray-800 text-sm cursor-pointer font-primaryMedium">
                <div className="grid col-span-2">დასახელება</div>
                <div>თანხა</div>
                {/* <div>გადახდილი თანხა</div> */}
                <div>გადახდის თარიღი</div>
                <div>თვეების ხანგრძლივობა</div>
                <div>მომთხოვნის ვინაობა</div>
                <div>თვიური გადასახადი</div>
                <div>გადახდის პროცენტი</div>
                <div></div>
              </div>
            </div>
            {loansList?.map((l) => (
              <div
                key={`loan${l.id}`}
                className="grid grid-cols-9 border-b items-center gap-8 py-4 px-6 hover:bg-gray-50 transition-all text-gray-600 cursor-pointer font-primaryMedium"
              >
                <div className="text-gray-900 grid col-span-2">
                  {l.loan_details.name}
                </div>
                <div>{l.loan_details.total_due} ₾</div>
                <div>{l.loan_details.due_date}</div>
                <div>{l.loan_details.months_remaining}</div>
                <div>{l.sender.first_name + " " + l.sender.last_name}</div>
                <div>{l.loan_details.monthly_payment} ₾</div>
                <div>{Math.floor(l.share_percentage)} %</div>
                <div className="flex flex-row gap-4 justify-end">
                  {l.status === "pending" ? (
                    <>
                      <div title="თანხმობა">
                        <Check
                          className="text-green-700"
                          onClick={() => handleAccept(l.id)}
                        />
                      </div>
                      <div title="უარი">
                        <X
                          className="text-red-700"
                          onClick={() => handleReject(l.id)}
                        />
                      </div>
                    </>
                  ) : (
                    <div title="უარი">
                      <Trash2
                        className="text-red-700"
                        onClick={() => handleReject(l.id)}
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

export default LoansRequests;
