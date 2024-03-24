import React from "react";
import { ReactNode } from "react";
import List from "../pages/List/List";

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
];
