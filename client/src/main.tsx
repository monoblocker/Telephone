import App from './App.tsx'
import './index.css'
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./components/pages/Errors/ErrorPage";
import {MAIN_ROUTE} from "./utils/routes";

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: MAIN_ROUTE,
        element: <App/>,
        errorElement: <ErrorPage/>
    },
]);


root.render(
    <RouterProvider router={router}/>
);
