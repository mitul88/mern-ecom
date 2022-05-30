import React from "react";
import {Routes, Route, Redirect} from "react-router-dom";
import Home from "./Home";

const Main = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    )
}

export default Main;