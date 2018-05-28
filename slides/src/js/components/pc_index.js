import React from "react";
import { BrowserRouter as Router,Route,Switch} from "react-router-dom";
import PCHeader from "./pc_header";
import PCFooter from "./pc_footer";
import PCHomepageContainer from "./pc_homepage_container";
export default class pcIndex extends React.Component{
	render(){
		return(
			<div>
				<PCHeader/>
				<PCHomepageContainer/>
				<PCFooter/>
			</div>
		);
	};
}
