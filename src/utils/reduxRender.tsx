import React, { ReactElement } from 'react'
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "../redux/redux-store";
import { BrowserRouter } from "react-router-dom";

const testStore = (state: RootState) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState: state,
    });
};

export const renderWithStore = (component: ReactElement, InitialState: any) => {
    const Wrapper: React.FC = ({ children }) => (
        <Provider store={testStore(InitialState)}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    );
    return render(component, { wrapper: Wrapper });
};


