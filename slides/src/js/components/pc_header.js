import React from "react";
import { Row,Col } from "antd";
import {Link} from "react-router-dom";
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal
 } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem =Form.Item;
const TabPane = Tabs.TabPane;
import AV from "leancloud-storage";
// 存储服务



class PCHeader extends React.Component{

	constructor(){
		super();
		this.state = {
			current: "top",
			modalVisible: false,
			action: "login",
			hasLogined: false,
			userNickName: "",
			userId: 0,
			slidesIndex:0,
			slidesId:'undefined',
		};
	}
	componentDidMount(){/*
		let userid = localStorage.userid;
		let slideslistStr = localStorage.getItem(userid);
		let slideslist = JSON.parse(slideslistStr);
		console.log("slideslist",slideslist);
		slideslist?this.setState({slidesIndex:slideslist.length}):this.setState({slidesIndex:0});*/
	}
	componentWillMount(){
		console.log(localStorage);
		if(localStorage.userid != "" && localStorage.userid != "undefined"){
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userId:localStorage.userid})
		}
	}
	setModalVisible(value){
		this.setState({modalVisible: value});
	};

	handleClick(e){
		if(e.key == "register"){
			this.setState({current:"register"});
			this.setModalVisible(true);
		}else{

			this.setState({current:e.key});

		}
	};
	signUp(e){
		e.preventDefault();
		var formData = this.props.form.getFieldsValue();
		var username = formData.r_userName;
  	var password = formData.r_password;
		var email = formData.r_email;
		var user = new AV.User();
		user.setUsername(username);
	  user.setPassword(password);
	  user.setEmail(email);
	  user.signUp().then(function(loginedUser) {
			console.log(loginedUser);
			localStorage.userid = loginedUser.id;
			localStorage.username = loginedUser.attributes.username;
			return 1;
		})
		.then((v)=>{v=1?this.setState({hasLogined:true,modalVisible:false}):''})
		.catch(function (error) {
		    alert(JSON.stringify(error));
				return 0;
		  });
	}
	logIn(e){
		e.preventDefault();
		var formData = this.props.form.getFieldsValue();
		var username = formData.userName;
  	var password = formData.password;
		AV.User.logIn(username, password)
		.then(function(loginedUser) {
			console.log(loginedUser);
			localStorage.userid = loginedUser.id;
			localStorage.username = loginedUser.attributes.username;
			return 1;
		})
		.then((v)=>{v=1?this.setState({hasLogined:true,modalVisible:false}):''})
		.catch(function (error) {
		    alert(JSON.stringify(error));
				return 0;
		  });
		};
		newSlides(){/*
			var slides = new AV.Slides();
	  	slides.set('owner', AV.User.current());
		  slides.save().then(function(slides) {
				return slides.id;
		  })
			.then((id)=>{this.setState({slidesId:id});})
			.catch(function(error) {
		    alert(JSON.stringify(error));
		  });*/
		}
	/*handleSubmit(e){
		e.preventDefault();
		var myFetchOptions = {
			method: "GET"
		};
		var formData = this.props.form.getFieldsValue();

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response=>response.json()).then(json=>{
			this.setState({userNickName:json.NickUserName,userid:json.UserId});
			localStorage.userid = json.UserId;
			localStorage.userNickName = json.NickUserName;
		});

		if(this.state.action=="login"){
			this.setState({hasLogined:true});
		}
		message.success("请求成功！");
		this.setModalVisible(false);
	};*/

	callback(key){
		if(key == 1){
			this.setState({action:"login"});
		}else if(key == 2){
			this.setState({action:"register"});
		}
	};

	logout(){
		localStorage.userid = "";
		localStorage.userNickName = "";
		this.setState({hasLogined:false});
		AV.User.logOut();
	}
	render(){
		let {getFieldDecorator} = this.props.form;/*主要用于接收表单的一些参数*/

		const userShow = this.state.hasLogined
		?
		<Menu.Item key="logout" class="register">
			<p class="linkStyle">
			<Link target="_self" to={`/editor/${this.state.slidesId}`}>
				<Button type="primary" htmlType="button" onClick={this.newSlides.bind(this)}>新建slides</Button>
			</Link>
			</p>
			&nbsp;&nbsp;
			<p class="linkStyle">
			<Link target="_self" to={`/usercenter`}>
				<Button type="dashed" htmlType="button">个人中心</Button>
			</Link>
			</p>
			&nbsp;&nbsp;
			<p class="linkStyle">
			<Link to={`/`}>
				<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
		  </Link>
			</p>
		</Menu.Item>
		:
		<Menu.Item key="register" class="register">
			<Icon type="user"/>登录/注册
		</Menu.Item>;
		return(
			<header>
				<Row>
					<Col span={1}></Col>
					<Col span={4}>
						<a href="/">
							<img  class="logo" src="/src/images/logo.png" alt="logo" />
						</a>
					</Col>
					<Col span={13}></Col>
					<Col span={5}>
            <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
							{userShow}
						</Menu>
						<Modal title="用户中心" wrapClassName="veitical-center-modal" visible={this.state.modalVisible}
						onCancel = {()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText = "关闭">

							<Tabs type="card" onChange={this.callback.bind(this)}>

								<TabPane tab="登录" key="1">
									<Form layout="horizontal" onSubmit={this.logIn.bind(this)}>
										<FormItem label="账户" >
											{getFieldDecorator("userName")(<Input placeholder="请输入您的账号" />)}
										</FormItem>
										<FormItem label="密码" >
										{getFieldDecorator("password")(<Input type="password" placeholder="请输入您的密码" />)}
										</FormItem>
										<Button type="primary" htmlType="submit">登录</Button>
									</Form>
								</TabPane>

								<TabPane tab="注册" key="2">
									<Form layout="horizontal" onSubmit={this.signUp.bind(this)}>
										<FormItem label="账户" >
											{getFieldDecorator("r_userName")(<Input placeholder="请输入您的账号" />)}
										</FormItem>
										<FormItem label="密码" >
										{getFieldDecorator("r_password")(<Input type="password" placeholder="请输入您的密码" />)}
										</FormItem>
										<FormItem label="邮箱" >
										{getFieldDecorator("r_email")(<Input type="email" placeholder="请输入您的邮箱" />)}
										</FormItem>
										<Button type="primary" htmlType="submit">注册</Button>
									</Form>
								</TabPane>
							</Tabs>
						</Modal>
					</Col>
					<Col span={1}></Col>
				</Row>
			</header>
		);
	};
}
export default PCHeader = Form.create({})(PCHeader);
