


import { Route, Routes, useNavigate, Navigate, redirect, BrowserRouter, useLocation, } from 'react-router-dom'
import Edits from './Edits'
import New from './New'
import Accounts from './Accounts'
import ManageClass from './ManageClass'
import GetSuggestionsAndReply from './GetSuggestionsAndReply/GetSuggestionsAndReply'
import ApproveQuestions from './ApproveQuestions/ApproveQuestions'
export default function Components(props) {
    return <Routes>
        <Route path="/" element={<Edits />}></Route>
        <Route path="/edit" element={<Edits></Edits>}></Route>
        <Route path="/new" element={<New></New>}></Route>
        <Route path="/account" element={<Accounts></Accounts>}></Route>
        <Route path="/classes" element={<ManageClass></ManageClass>}> </Route>
        <Route path="/approve_questions" element={<ApproveQuestions></ApproveQuestions>}> </Route>
        <Route path="/get_suggestions_and_reply" element={<GetSuggestionsAndReply></GetSuggestionsAndReply>}></Route>

    </Routes>
}