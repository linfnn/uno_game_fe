import Rooms from "./components/rooms";
import PlayingRoom from "./components/rooms/playingRoom";

const routes = [
    {
        path: '/',
        element: <Rooms />
    },
    {
        path: '/playing_room',
        element: <PlayingRoom />
    }
]

export default routes