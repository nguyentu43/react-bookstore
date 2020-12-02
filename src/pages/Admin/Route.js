import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import Layout from "./Layout";

export default function AdminRoute(){
    return <Layout>
        <Switch>
            <Route path="/admin/dashboard" component={Dashboard}/>

            <Redirect to="/admin/dashboard"/>
        </Switch>
    </Layout>
}