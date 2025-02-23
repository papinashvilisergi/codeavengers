import { Loan } from "@/types/login";
import { LoanRequest } from "@/types/participation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSendUserRequests } from "@/react-query/mutation/requests";
import { Label } from "@/components/ui/label";
const Loans = ({
  headline,
  loans,
}: {
  headline: string;
  loans: Loan[] | undefined;
}) => {
  const defaultValues = { loan: 0, personal_number: 0, percentage: 0 };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanRequest>({
    defaultValues: defaultValues,
  });
  const [loanType, setLoanType] = useState(0);
  const handleStringToInt = (value: string) => {
    setLoanType(parseInt(value));
  };
  const navigate = useNavigate();
  const { mutate } = useSendUserRequests();
  const onSubmit = () => {
    const payload = {
      loan: loanType,
      receiver: [
        {
          personal_number: control._formValues.personal_number,
          share_percentage: Number(control._formValues.percentage),
        },
      ],
    };

    mutate(payload, {
      onSuccess: () => {
        navigate("/en/requests");
      },
    });
  };

  return (
    <>
      <Card className="w-full rounded-2xl px-4">
        <CardHeader className=" border-b">
          <CardTitle>{headline}</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="flex flex-col">
            <div className="grid grid-cols-6 border-b gap-6 py-2 px-6  text-gray-800 text-sm cursor-pointer font-primaryMedium">
              <div>დასახელება</div>
              <div>თანხა</div>
              <div>თვეების რაოდენობა</div>
              <div>გადახდილი თანხა</div>
              <div>ყოველთვიური გადასახადი</div>
              <div>გადასახადის თარიღი</div>
            </div>
          </div>
          {loans?.map((l) => (
            <div
              key={`loan-${l.id}`}
              className="grid grid-cols-6 border-b items-center gap-6 py-4 px-6 hover:bg-gray-50 transition-all text-gray-600 cursor-pointer font-primaryMedium"
            >
              <div className="text-gray-900">{l.name}</div>
              <div>{Math.floor(l.total_due)} ₾</div>
              <div>{l.months_remaining}</div>
              <div>{Math.floor(Number(l.amount_paid))} ₾</div>
              <div>{Math.floor(l.monthly_payment)} ₾</div>
              <div>{l.due_date}</div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end px-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="font-primaryMedium ">
                მოთხოვნის გაგზავნა
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle className="text-sm font-primaryRegular">
                    სესხის თანამონაწილეობაზე მოთხოვნის გაგზავნა
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div>
                    <Select onValueChange={handleStringToInt}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="აირჩიეთ სესხი" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {loans?.map((l) => (
                            <SelectItem key={`sel${l.id}`} value={String(l.id)}>
                              {l.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className=" items-center space-y-2 gap-4">
                    <Label>მომხმარებლის პირადი ნომერი</Label>
                    <Controller
                      control={control}
                      name="personal_number"
                      rules={{ required: true, minLength: 11, maxLength: 11 }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          onChange={onChange}
                          minLength={11}
                          maxLength={11}
                          value={value}
                          autoComplete="off"
                        />
                      )}
                    />
                    {errors.personal_number && (
                      <span className="text-destructive text-xs">
                        პირადი ნომერი უნდა შედგებოდეს 11 ციფრისგან
                      </span>
                    )}
                  </div>
                  <div className=" items-center gap-4 space-y-2">
                    <Label>გადასახადის %-ული მაჩვენებელი</Label>
                    <Controller
                      control={control}
                      name="percentage"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          onChange={onChange}
                          value={value}
                          autoComplete="off"
                        />
                      )}
                    />
                    {errors.percentage && (
                      <span className="text-destructive text-xs">
                        შეიყვანეთ პროცენტი
                      </span>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">გაგზავნა</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
};

export default Loans;
