import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

export function testRender(jsx: React.ReactElement, { store, ...otherOpts }: any) {
    return render(<Provider store={store}>{jsx}</Provider>, otherOpts);
}