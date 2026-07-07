import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import App from '../App'
import Home from '../pages/Home'
import Movies from '../pages/Movies'
import Detail from '../pages/Detail'
import NowPlaying from '../pages/NowPlaying'
import Upcoming from '../pages/Upcoming'
import TopRated from '../pages/TopRated'
import Notfound from '../pages/Notfound'

export type RouteHandle = {
    title: string
}

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
        children : [
            {
                index:true,
                element: <Home />,
            },{
                path:"movies",
                handle: {title:"인기"},
                element: <Movies />
            },{
                path:"now-playing",
                handle:{title:"현재 상영 중"},
                element: <NowPlaying />
            },{
                path:"upcoming",
                handle:{title:"개봉 예정"},
                element: <Upcoming />
            },{
                path:"top-rated",
                handle: {title:"높은 평점"},
                element: <TopRated />
            },{
                path:"detail/:id",
                element: <Detail />
            }
        ]
    }
]

const router = createBrowserRouter(routes as RouteObject[])
export default router;