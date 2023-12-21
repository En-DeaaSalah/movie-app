import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router";
import {router} from "./routes";
import {QueryClient, QueryClientProvider} from "react-query";
import {ConfigProvider} from "antd";

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root") as any).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ConfigProvider
                typography={{
                    className: "textFont"
                }}>
                <RouterProvider router={router}/>
            </ConfigProvider>
        </QueryClientProvider>
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
