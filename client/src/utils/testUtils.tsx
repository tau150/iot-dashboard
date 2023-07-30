/* eslint-disable react-refresh/only-export-components */
import { render as RTLRender, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { PropsWithChildren, ReactElement } from "react";

import { theme } from "../theme";

const Providers = ({ children }: PropsWithChildren): ReactElement => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const render = (component: ReactElement, options?: RenderOptions) =>
  RTLRender(component, { wrapper: Providers, ...options });

export * from "@testing-library/react";

export { render };
