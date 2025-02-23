import { Request } from "@/types/participation";
import { Utilities } from "@/types/login";
import { useForm, Controller } from "react-hook-form";
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
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useSendUserRequests } from "@/react-query/mutation/requests";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const Loans = ({
  headline,
  bills,
}: {
  headline: string;
  bills: Utilities[] | undefined;
}) => {
  const defaultValues = { bills: 0, personal_number: 0 };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Request>({
    defaultValues: defaultValues,
  });
  const [billsType, setBillsType] = useState(0);

  const handleStringToInt = (value: string) => {
    setBillsType(parseInt(value));
  };
  const navigate = useNavigate();
  const { mutate } = useSendUserRequests();
  const onSubmit = () => {
    const payload = {
      utility: billsType,
      receiver: [
        {
          personal_number: control._formValues.personal_number,
          share_percentage: 50,
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
            <div className="grid grid-cols-5 border-b gap-6 py-2 px-6  text-black text-sm cursor-pointer font-primaryMedium">
              <div>დასახელება</div>
              <div>აბონენტის ნომერი</div>
              <div>თანხა</div>
              <div>მისამართი</div>
              <div>გადასახადის თარიღი</div>
            </div>
          </div>
          {bills?.map((b) => (
            <div
              key={`bill-${b.id}`}
              className="grid grid-cols-5 border-b gap-6 py-4 px-6 hover:bg-gray-50 transition-all text-gray-600 cursor-pointer font-primaryMedium"
            >
              <div className="text-gray-900">{b.name}</div>
              <div>{b.subscriber_number}</div>
              <div>{b.total_due} ₾</div>
              <div>{b.address}</div>
              <div>{b.due_date}</div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end px-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="font-primaryMedium ">
                {" "}
                მოთხოვნის გაგზავნა
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle className="text-sm font-primaryRegular">
                    კომუნალურზე თანამონაწილეობის მოთხოვნა
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div>
                    <Select onValueChange={handleStringToInt}>
                      <SelectTrigger>
                        <SelectValue placeholder="აირჩიეთ კომუნალური" />
                      </SelectTrigger>
                      <SelectContent>
                        {bills?.map((b) => (
                          <SelectItem
                            key={`select${b.id}`}
                            value={String(b.id)}
                          >
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.bills && (
                      <span className="text-destructive text-xs">
                        აირჩიეთ კომუნალური
                      </span>
                    )}
                  </div>
                  <div className=" items-center gap-4 space-y-2">
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
