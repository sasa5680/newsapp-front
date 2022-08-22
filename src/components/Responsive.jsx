import React from "react";
import { useMediaQuery } from "react-responsive";
import { devices } from "../styles/Common"
export default function Pagenation(){

    const isMobile = useMediaQuery({ query: devices.mobileL});
    
    const isPC = useMediaQuery({query: devices.laptop})

    return {isMobile, isPC}
}
