import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Tenant from "./pages/Tenant";
import TenantPayment from "./pages/TenantPayment";
import OwnerPropertyDetail from "./pages/OwnerPropertyDetail";
import { PropertyProvider } from "./context/PropertyContext";
import Layout from "./components/layout/Layout";
import CreateResident from "./pages/CreateResident";
import EditAccountPage from "./pages/EditAccountPage";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const ownerId = localStorage.getItem("ownerId");
  const tenantId = localStorage.getItem("tenantId");

  const defaultRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/signup", element: <Signup /> },
        { path: "/property/:propertyId", element: <OwnerPropertyDetail /> },
      ],
    },
  ]);

  const tenantRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/resetPassword", element: <ResetPassword /> },
        { path: "/signup", element: <Signup /> },
        { path: "/tenant", element: <Tenant /> },
        { path: "/tenantPayment", element: <TenantPayment /> },
        { path: "/editAccount", element: <EditAccountPage /> },
      ],
    },
  ]);

  const ownerRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/signup", element: <Signup /> },
        { path: "/property/:propertyId", element: <OwnerPropertyDetail /> },
        { path: "/resetPassword", element: <ResetPassword /> },
        { path: "/createResident", element: <CreateResident /> },
        { path: "/editAccount", element: <EditAccountPage /> },
      ],
    },
  ]);

  return (
    <UserContextProvider>
      <PropertyProvider>
        {tenantId ? (
          <RouterProvider router={tenantRouter}></RouterProvider>
        ) : ownerId ? (
          <RouterProvider router={ownerRouter}></RouterProvider>
        ) : (
          <RouterProvider router={defaultRouter}></RouterProvider>
        )}
      </PropertyProvider>
    </UserContextProvider>
  );
}

export default App;
