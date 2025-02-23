import { useNavigate } from "react-router-dom";
import BillsRequests from "./bills";
import LoansRequests from "./loans";
import { useEffect } from "react";
import { useGetUserRequests } from "@/react-query/query/requests";
import { RequestType } from "@/types/participation";

const RequestsPage = () => {
  const { data } = useGetUserRequests();
  const navigate = useNavigate();

  const ifAuth = localStorage.getItem("authUser");

  useEffect(() => {
    if (!ifAuth) {
      navigate("/en/login");
    }
  }, [ifAuth, navigate]);

  console.log("request type", data);
  const loans = data?.filter((l: RequestType) => {
    return l.loan_details !== null;
  });

  const bills = data?.filter((b: RequestType) => {
    return b.utility_details !== null;
  });

  return (
    <div className="mx-auto flex flex-col gap-10">
      <BillsRequests bills={bills} />
      <LoansRequests loans={loans} />
    </div>
  );
};

export default RequestsPage;
