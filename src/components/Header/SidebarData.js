import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';



export const SidebarData = [


{
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
},
{
    title: 'Artists',
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
},
{
    title: 'Albums',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
},




]