import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { loginType } from "@/types/login";
import { SignInSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useLogin } from "@/react-query/mutation/user";
import { useNavigate, useParams } from "react-router-dom";
import { userAtom } from "@/store/auth";
import { setAuthToken } from "@/api";
import { useSetAtom } from "jotai";

const LoginForm = () => {
  const setuser = useSetAtom(userAtom);
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({
    defaultValues: { username: "", password: "" },
    resolver: zodResolver(SignInSchema),
  });
  const { mutate } = useLogin();
  const onSubmit = (fieldValues: loginType) => {
    mutate(fieldValues, {
      onSuccess: (data) => {
        setAuthToken(data?.access);
        localStorage.setItem("authUser", JSON.stringify(data));
        setuser(data);
        navigate(`/${lang}/participation`);
      },
    });
  };

  return (
    <>
      <Card className="w-full mt-12 rounded-2xl lg:p-2 mb-6">
        <CardHeader>
          <CardTitle className="font-primaryBold text-2xl">
            {t("login.welcome")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10">
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full  gap-6">
                  <div>
                    <Controller
                      name="username"
                      control={control}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <Input
                            onChange={onChange}
                            value={value}
                            className="bg-[#eef1f1] h-[60px] font-primaryMedium focus-visible:ring-0 focus-visible:ring-offset-1"
                            placeholder="Username"
                          />
                        );
                      }}
                    />
                    <div className="text-destructive mt-1 h-[1px] text-sm">
                      {errors.username && (
                        <span>გთხოვთ შეიყვანოთ მომხმარებლის სახელი</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <Input
                            onChange={onChange}
                            type="password"
                            value={value}
                            placeholder={t("login.password")}
                            className="bg-[#eef1f1] h-[60px] font-primaryMedium focus-visible:ring-0 focus-visible:ring-offset-1"
                          />
                        );
                      }}
                    />
                    <div className="text-destructive mt-1 h-[1px] text-sm">
                      {errors.password && t("login.pass_error")}
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="default"
                      className="font-primaryUpper w-full h-[60px] font-bold text-lg"
                    >
                      <ArrowRight size={28} strokeWidth={3} />
                      <span className="pt-1"> {t("login.login")}</span>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div className="lg:w-1/3  space-y-2">
              <img
                src="../qr.svg"
                className="w-[140px] mb-4 border rounded-md"
              />
              <div className="font-primaryBold text-xs">
                {t("login.log_easily")}
              </div>
              <div className="text-xs font-primaryRegular">
                {t("login.scan")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginForm;
