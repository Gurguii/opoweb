import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Constitucion } from "../components/Constitucion";

export const MainLayout = () => {
    const [currentTemario, setCurrentTemario] = useState<string>('constitucion');

    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <Sidebar setCurrentTemario={setCurrentTemario}/>
            <main className="flex grow  bg-gray-200 h-full overflow-y-auto">
                {/* Main content */}
                {currentTemario=='constitucion' && <Constitucion/>}
            </main>
        </div>
    )
}