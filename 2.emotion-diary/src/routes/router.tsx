import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import App from '../App.tsx'
import Home from '../pages/Home.tsx'
import Diary from '../pages/Diary.tsx';
import New from '../pages/New.tsx';
import Edit from '../pages/Edit.tsx';
import Notfound from '../pages/Notfound.tsx'

export type RouteHandle = {
    title: string;
};

export type AppRoute = {
    path?:string;
    element?: React.ReactElement;
    handle?: RouteHandle;
    index?: boolean;
    children?: AppRoute[];
    errorElement?: React.ReactElement
}

export const routes: AppRoute[] = [
    {
        path:'/',
        element: <App />, 
        errorElement: <Notfound />,       
        children:[  
            {
                index:true,
                element: <Home />,                
            },          
            {
                path:"new",
                element: <New />,
                
            },{
                path:"diary/:id",
                element: <Diary />
            },{
                path:"edit/:id",
                element: <Edit />
            }
        ]
    }
]

const router = createBrowserRouter(routes as RouteObject[])
export default router;