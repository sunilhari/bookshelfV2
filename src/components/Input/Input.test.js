import React from "react";
import { render } from "@testing-library/react";
import { SearchContextProvider } from "../../Context/SearchContext";
import { AppContextProvider } from "../../Context/AppContext";
import Input from "../Input";
const ContextWrapper = ({ children }) => (
 <AppContextProvider>
  <SearchContextProvider>{children}</SearchContextProvider>
 </AppContextProvider>
);

test("Should render without crashing", () => {
 render(
  <ContextWrapper>
   <Input />
  </ContextWrapper>
 );
});

test("Should update state when input text changes", () => {
 const { container, getByTestId } = render(
  <ContextWrapper>
   <Input />
  </ContextWrapper>
 );
 const inputField = getByTestId("test-search-input");
});
