/* eslint-disable react/jsx-key */

import AppTableComponent from "@/components/appTable";
import DataBase from "@/dba/data";
import Link from "next/link";
import { Router } from "next/router";

const headers = ["ID", "Name", "Description", "Price", "Status", "Actions"];

export default function Home() {
  const tableProps = {
    headers,
    data: DataBase,
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <AppTableComponent {...tableProps} />
    </main>
  );
}
