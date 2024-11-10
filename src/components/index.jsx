


import { Route, Routes, useNavigate, Navigate, redirect, BrowserRouter, useLocation, } from 'react-router-dom'
import Edits from './Edits'
import New from './New'
import Accounts from './Accounts'
import ManageClass from './ManageClass'

export default function Components(props) {
    return <Routes>
        <Route path="/" element={<Edits />}></Route>
        <Route path="/edit" element={<Edits></Edits>}></Route>
        <Route path="/new" element={<New></New>}></Route>
        <Route path="/account" element={<Accounts></Accounts>}></Route>
        <Route path="/classes" element={<ManageClass></ManageClass>}> </Route>
    </Routes>
}