import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { RootState, setupStore } from "../redux/redux-store";

type RenderTypes = {
    route?: any
    initialState?: RootState
}

export const testRender = (component: React.ReactElement, options: RenderTypes) => {
    const store = setupStore(options?.initialState)

    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[ options?.route ]}>
                {component}
            </MemoryRouter>
        </Provider>
    );
}