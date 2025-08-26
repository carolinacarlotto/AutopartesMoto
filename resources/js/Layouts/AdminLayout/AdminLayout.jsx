// Layout General
import React, {useEffect, useState} from "react";
import Navbar from "./Components/Navbar.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Footer from "./Components/Footer.jsx";
import NotificationSystem from "./Components/NotificationSystem.jsx";

const AdminLayout = ({ auth, children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsSidebarExpanded(window.innerWidth >= 768); // Expand sidebar on larger screens
        };

        handleResize(); // Set initial state based on current window size
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar toggleSidebar={toggleSidebar} isSidebarExpanded={isSidebarExpanded} />
            <div className={`flex`}>
                <Sidebar
                    auth={auth}
                    isExpanded={isSidebarExpanded}
                    setIsSidebarExpanded={setIsSidebarExpanded}
                />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300">
                    <NotificationSystem />
                    {children}
                    {/*<Footer />*/}
                </main>
            </div>
            {/* Mobile Sidebar Overlay */}
            {isSidebarExpanded && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={ () => setIsSidebarExpanded(false) }
                />
            )}
        </div>
    );
};

export default AdminLayout;
