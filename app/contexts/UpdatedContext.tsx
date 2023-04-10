import { createContext, useState } from "react";

interface IUpdatedContext {
  updated: number,
  setUpdated: React.Dispatch<React.SetStateAction<number>>
}

export const UpdatedContext = createContext<IUpdatedContext | undefined>(undefined);

export default UpdatedContext;
