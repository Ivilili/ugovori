import React from "react";
import { ReactNode } from "react";
import List from "../pages/List/List";
import Details from "../pages/Details/Details";

export interface AppRoute {
  path: string;
  name?: string;
  element?: ReactNode;
  childRoute?: { path: string; name?: string; element?: ReactNode }[];
}


export const PublicRoutes: AppRoute[] = [
  {
    path: "/",
    name: "Kupoprodajni ugovori",
    element: <List />,
  },
  {
    path: "/contract/:id",
    name: "Ugovor",
    element: <Details />,
  },
];
