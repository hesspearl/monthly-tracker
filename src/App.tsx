import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MonthlyList from "./components/monthlyList";
import "bootstrap/dist/css/bootstrap.min.css";
import "flag-icon-css/css/flag-icons.min.css";
import "./app.css";
import { useLocalStorage } from "./hook/useLocalStorage";
import TransactionLayout from "./components/monthlyPageLayout";
import MonthlyPurchase from "./components/monthpurchase";
import { v4 as uuidV4 } from "uuid";
import { Months, getDate } from "./utils/days";

// interface StringValidator {
//   isAcceptable(s: string): boolean;
// }
// const lettersRegexp = /^[A-Za-z]+$/;
// class LettersOnlyValidator implements StringValidator {
//   isAcceptable(s: string) {
//     return lettersRegexp.test(s);
//   }
// }

export type Tag = {
  id: string;
  label: string;
};

export type Transaction = {
  id: string;
} & TransactionData;

export type RawTransaction = {
  id: string;
} & RawTransactionData;

export type commonTransactionData = {
  title: string;
  total: number;
  image: string;
  purchases: Purchase[];
};
export type RawTransactionData = {
  tagsIds: string[];
} & commonTransactionData;

export type TransactionData = {
  tags: Tag[];
  tagsIds: string[];
} & commonTransactionData;

export type Purchase = {
  id: string;
  month: Months | string;
  year: number;
  total: number;
  remain: number;
  expends: Expends[];
  date: Date;
};

export type Expends = {
  id: string;
  date: number;
  day: [string, string];
  amount: number;
};

const localStorageKey = "TRANSACTIONS";

function App() {
  const [transactionData, setTransactionData] = useLocalStorage<
    RawTransaction[]
  >(localStorageKey, []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const { currentMonth } = getDate;
  const onCreateTransaction = ({ ...data }: RawTransactionData) => {
    setTransactionData((prevTransactions) => [
      ...prevTransactions,
      { ...data, id: uuidV4() },
    ]);
  };

  function onUpdate(id: string, { ...data }: TransactionData): void {
    const updateData: TransactionData = {
      ...data,
      total: data?.purchases[0]?.remain,
    };
    setTransactionData((prevTransactions) =>
      prevTransactions.map((Transaction) => {
        if (Transaction.id === id) {
          return { ...Transaction, ...updateData };
        } else {
          return Transaction;
        }
      })
    );
  }

  function onAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  const onUpdateTag = (id: string, label: string) => {
    setTags((prevTags) =>
      prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      })
    );
  };

  const onDeleteTag = (id: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  function onDeleteTransactionTag(id: string, tagId: string): void {
    setTransactionData((prevTransactions) =>
      prevTransactions.map((Transaction) => {
        if (Transaction.id === id) {
          return {
            ...Transaction,
            tagsIds: Transaction.tagsIds.filter((tag) => tag !== tagId),
          };
        } else {
          return Transaction;
        }
      })
    );
  }

  const TransactionsWithTags = useMemo(
    () =>
      transactionData.map((Transaction) => {
        const currentMonthPurchase = Transaction.purchases.find(
          (purchase) => purchase.month === currentMonth
        );

        return {
          ...Transaction,
          total: currentMonthPurchase ? currentMonthPurchase.remain : 0,
          tags: tags.filter((tag) => Transaction.tagsIds?.includes(tag.id)),
        };
      }),
    [transactionData, currentMonth, tags]
  );

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MonthlyList
              availableTags={tags}
              Transactions={TransactionsWithTags}
              onSubmit={onCreateTransaction}
              {...{
                onAddTag,
                selectedTags,
                setSelectedTags,
                onUpdateTag,
                onDeleteTag,
              }}
            />
          }
        />
        <Route
          path="/:id"
          element={<TransactionLayout Transactions={TransactionsWithTags} />}
        >
          <Route
            index
            element={
              <MonthlyPurchase
                availableTags={tags}
                {...{
                  onAddTag,
                  selectedTags,
                  setSelectedTags,
                  onUpdateTag,
                  onUpdate,
                  onDeleteTransactionTag,
                }}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
