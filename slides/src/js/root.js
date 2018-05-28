import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router,Route,Switch} from "react-router-dom";
import { Button } from "antd";
import "antd/dist/antd.css";  // or "antd/dist/antd.less"
import PCIndex from "./components/pc_index";
import PCEditor from "./components/pc_editor";
import PCPlayer from "./components/pc_player";
import PCUserCenter from "./components/pc_usercenter";
import MediaQuery from "react-responsive";

export default class Root extends React.Component{
  render(){
    return (
      <div>
        <MediaQuery query="(min-device-width: 1224px)">
          <Router>
            <Switch>
              <Route exact path="/" component={PCIndex}></Route>
              <Route path="/editor/:curslidesIndex" component={PCEditor}></Route>
              <Route path="/usercenter" component={PCUserCenter}></Route>
              <Route path="/player/:slidesIndex" component={PCPlayer}></Route>
            </Switch>
          </Router>
        </MediaQuery>
      </div>
    );
  };
}

ReactDOM.render(<Root/>, document.getElementById("mainContainer"));
