import { Navigate, Outlet, useParams } from "react-router-dom";
import { Transaction } from "../../App";
interface TransactionsLayoutProps {
  Transactions: Transaction[];
}

function TransactionsLayout({ Transactions }: TransactionsLayoutProps) {
  const { id } = useParams();
  const Transaction = Transactions.find((n) => n.id === id);

  if (!Transaction) {
    return <Navigate to="/" replace />;
  }
  return <Outlet context={Transaction} />;
}

export default TransactionsLayout;
