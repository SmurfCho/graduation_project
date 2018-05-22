import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import {Row,Col,Modal} from "antd";
import { Menu,Icon} from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {
  Tabs,
  message,
  Form,
  Input,
  Button,
  CheckBox,
  Card,
  notification,
  Upload
} from "antd";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import PCHeader from "./pc_header";
import PCFooter from "./pc_footer";

export default class PCUserCenter extends React.Component{
  constructor(){
    super();
    this.state = {
      userwork: "",
      usercollection:"",
      previewImage: "",
      previewVisible: false,
      slideslist:"",
      userid:"",
    };
  };
  handleCancel(e){
    this.setState({
      previewVisible: false,
    });
  }
  componentDidMount(){
    /*var myFetchOptions = {
      method: "GET"
    };
    fetch( ,myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({});
    });
    fetch( ,myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({});
    });*/

    let userid = localStorage.userid;
    let slideslistStr = localStorage.getItem(userid);
    let slideslist = JSON.parse(slideslistStr);
    console.log("slideslist",slideslist);
    this.setState({slideslist:slideslist,userid:userid});
  };
  render(){
    const props = {
      action: "",
      headers: {
        "Access-Control-Allow-Origin":"*"
      },
      listType: "picture-card",
      defaultFileList:[

      ],
      onPreview: (file)=>{
        this.setState({previewImage:file.url,previewVisible:true});
      }
    };
    const {userwork,usercollection} = this.state;
    const {slideslist,userid} = this.state;
    const showslideslist = userwork.length ? userwork : slideslist;
    console.log("showslideslist:",showslideslist);
    const userworkList = showslideslist.length ?
    showslideslist.map((slides,index)=>(
      <Card key={index}>
        <Link to={`/player/${index}`}  target="_blank">
          <p><span>{index+1}</span>&nbsp;&nbsp;&nbsp;<span>{slides.slidesName}</span></p>
        </Link>
      </Card>
    ))
    :
    <Card>
      <p>您还没有作品</p>
    </Card>

    const usercollectionList = usercollection.length ?
    usercollection.map(()=>(
      <Card>
        <p></p>
      </Card>
    ))
    :
    <Card>
      <p>您还没有收藏任何作品</p>
    </Card>
    return(
      <div>
        <PCHeader/>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
          <Tabs>
            <TabPane tab="我的作品列表" key="1">
              <div class="comment">
                <Row>
                  <Col span={24}>{userworkList}</Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="我的收藏列表" key="2">
              <div class="comment">
                <Row>
                  <Col span={24}>{usercollectionList}</Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="头像设置" key="3">
              <div class="clearfix">
              <Upload {...props}>
                <Icon type="plus"></Icon>
                <div className="ant-Upload-text">上传照片</div>
              </Upload>
              <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                <img alt="预览" src={this.state.previewImage}/>
              </Modal>
              </div>
            </TabPane>
          </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter/>
      </div>
    )
  };
};
