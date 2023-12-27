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
import FinancialStatementsPage from "./pages/FinancialStatementsPage";
import TenantPaymentHistoryPage from "./pages/TenantPaymentHistoryPage";
import PrivateRoutesUser from "./utilities/PrivateRoutesUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <PropertyProvider>
            <Layout>
              <Routes>
                {/* Route for both Users */}
                <Route element={<PrivateRoutesUser />}>
                  <Route path="/resetPassword" element={<ResetPassword />} />
                  <Route path="/editAccount" element={<EditAccountPage />} />
                </Route>
                {/* Owner Routes  */}
                <Route element={<PrivateRoutesOwner />}>
                  <Route path="/createResident" element={<CreateResident />} />

                  <Route
                    path="/property/:propertyId"
                    element={<OwnerPropertyDetail />}
                  />
                  <Route
                    path="/financialStatements"
                    element={<FinancialStatementsPage />}
                  />
                </Route>

                {/* Tenant Routes */}
                <Route element={<PrivateRoutesTenant />}>
                  <Route path="/tenant" element={<Tenant />} />
                  <Route
                    path="/tenantPayment"
                    element={<TenantPaymentHistoryPage />}
                  />
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
