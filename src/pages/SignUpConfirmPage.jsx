import React, { Component, useState } from "react";
import styled from "styled-components";

import { useQuery } from "react-query";
import { userConfirmUUID } from "../service/UserApi";

export default function SignUpConfirmPage({match}){
    
    const UUID = match.params.uuid;

    const { isLoading, isError, data: newsData } = useQuery(["UUID"], ()=>{userConfirmUUID(UUID)});


    return (<><InfoBox></InfoBox></>)

}

const InfoBox = styled.div`
    
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    height: 500px;
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: gray;

`


