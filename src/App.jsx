import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./ui/MainLayout";
import GlobalStyles from "./styles/GlobalStyles";
import Home from "./pages/Home";
import ElectricalAppliances from "./pages/Services/ElectricalAppliances";
import DeepCleaning from "./pages/Services/DeepCleaning";
import PestControl from "./pages/Services/PestControl";
import Plumbing from "./pages/Services/Plumbing";
import Carpentry from "./pages/Services/Carpentry";
import Electrical from "./pages/Services/Electrical";
import Brands from "./pages/Brands";
import FAQs from "./pages/FAQs";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Blogs from "./pages/Blogs";
// import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "./components/ui/toast";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import BlogPost from "./components/Blogs/BlogPost";
import Terms from "./pages/Terms";

import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/Auth/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import ProfilePage from "./pages/Dashboard/ProfilePage";
import CreateBlogPage from "./pages/Dashboard/CreateBlogPage";
import ViewMyBlogsPage from "./pages/Dashboard/ViewMyBlogsPage";
import { Toaster } from "react-hot-toast";
import BlogDetailPage from "./pages/Dashboard/BlogDetailPage";
import EditBlogPage from "./pages/Dashboard/EditBlogPage";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <ToastProvider>
        <GlobalStyles />
        <BrowserRouter>
          <AuthProvider>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route path="" element={<Home />} />
                  <Route
                    path="services/electrical-appliances"
                    element={<ElectricalAppliances />}
                  />
                  <Route
                    path="services/deep-cleaning"
                    element={<DeepCleaning />}
                  />
                  <Route
                    path="services/pest-control"
                    element={<PestControl />}
                  />
                  <Route path="services/plumbing" element={<Plumbing />} />
                  <Route path="services/carpentry" element={<Carpentry />} />
                  <Route path="services/electrical" element={<Electrical />} />

                  <Route path="/brands" element={<Brands />} />
                  <Route path="/faq" element={<FAQs />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/blogs" element={<Blogs />} />
                  {/* <Route path="/blogs/:id" element={<BlogPost />} /> */}
                  <Route path="/blogs/:slug" element={<BlogPost />} />
                  <Route path="/terms" element={<Terms />} />
                </Route>

                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="profile" replace />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="create-blog" element={<CreateBlogPage />} />
                  <Route path="my-blogs" element={<ViewMyBlogsPage />} />
                  <Route path="blogs/:id" element={<BlogDetailPage />} />
                  <Route path="edit-blog/:id" element={<EditBlogPage />} />
                </Route>
              </Routes>
            </AnimatePresence>
          </AuthProvider>
        </BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
      </ToastProvider>
    </motion.div>
  );
}

export default App;
