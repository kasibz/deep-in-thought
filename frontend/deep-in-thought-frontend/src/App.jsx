import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Tenant from "./pages/Tenant";
import OwnerPropertyDetail from "./pages/OwnerPropertyDetail";
import { PropertyProvider } from "./context/PropertyContext";
import Layout from "./components/layout/Layout";
import CreateResident from "./pages/CreateResident";
import EditAccountPage from "./pages/EditAccountPage";
import ResetPassword from "./pages/ResetPassword";
import PrivateRoutesOwner from "./utilities/PrivateRoutesOwner";
import PrivateRoutesTenant from "./utilities/PrivateRoutesTenant";

function App() {
import FinancialStatements from "./pages/FinancialStatementsPage";
import FinancialStatementsPage from "./pages/FinancialStatementsPage";
import TenantPaymentHistoryPage from "./pages/TenantPaymentHistoryPage";

function App() {
  const ownerId = localStorage.getItem("ownerId");
  const tenantId = localStorage.getItem("tenantId");
  console.log(ownerId)
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
        { path: "/tenantPayment", element: <TenantPaymentHistoryPage /> },
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
        { path: "/financialStatements", element: <FinancialStatementsPage /> },
      ],
    },
  ]);

  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <PropertyProvider>
            <Layout>
              <Routes>
                {/* Owner Routes  */}
                <Route element={<PrivateRoutesOwner />}>
                  <Route path="/createResident" element={<CreateResident />} />
                  <Route path="/resetPassword" element={<ResetPassword />} />
                  <Route path="/editAccount" element={<EditAccountPage />} />
                  <Route
                    path="/property/:propertyId"
                    element={<OwnerPropertyDetail />}
                  />
                </Route>

                {/* Tenant Routes */}
                <Route element={<PrivateRoutesTenant />}>
                  <Route path="/tenant" element={<Tenant />} />
                  <Route path="/tenantPayment" element={<TenantPayment />} />
                  <Route path="/resetPassword" element={<ResetPassword />} />
                  <Route path="/editAccount" element={<EditAccountPage />} />
                </Route>

                {/* unprotected routes */}
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </Layout>
          </PropertyProvider>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
