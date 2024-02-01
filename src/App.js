
import './App.css';
// import ChatRoom from './components/LoginRoom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css'
import Rooms from './components/rooms';
import RuleModal from './components/modal/RulesModal';
function App() {

    return (
        <>
            {/* <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element}></Route>
                )
                )}
            </Routes> */}
            <Rooms />
            {/* <PlayingRoom /> */}
            <RuleModal />
        </>
    )
}

export default App;
