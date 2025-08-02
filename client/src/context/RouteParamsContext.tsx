'use client';
import { createContext, useContext } from 'react';

type RouteParams = {
    username?: string;
    category?: string;
};

const RouteParamsContext = createContext<RouteParams>({});

export const useRouteParams = () => useContext(RouteParamsContext);

export const RouteParamsProvider = ({
                                        children,
                                        value,
                                    }: {
    children: React.ReactNode;
    value: RouteParams;
}) => (
    <RouteParamsContext.Provider value={value}>
        {children}
    </RouteParamsContext.Provider>
);
