import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import Home from "./pages/Home/Home";
import Art from "./pages/Art/Art";
import Write from "./pages/Write/Write";


// 布局组件
const Layout = () => {
  return (
    <>
      <Navbar />
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/arts/:id",
        element: <Art />,
      },
    ],
  },
  {
    path: "/write",
    element: <Write />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}



export default App;
