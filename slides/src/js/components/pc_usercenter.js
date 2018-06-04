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
  Upload,
} from "antd";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import PCHeader from "./pc_header";
import PCFooter from "./pc_footer";
import AV from "leancloud-storage";
var { Query, User} = AV;


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
      context:[],
      linkVisible: false,
      slidesId:'',
    };
  };
  showShareModal(e){
    let index = e.target.id;
    this.setState({
      linkVisible: true,slidesId:index
    });
  }
  handleShareOk(e){
    console.log(e);
    this.setState({
      linkVisible: false,
    });
  }
  handleShareCancel(e){
    console.log(e);
    this.setState({
      linkVisible: false,
    });
  }
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

    /*let userid = localStorage.userid;
    let slideslistStr = localStorage.getItem(userid);
    let slideslist = JSON.parse(slideslistStr);
    slideslist = slideslist ? slideslist : [];
    console.log("slideslist",slideslist);
    this.setState({slideslist:slideslist,userid:userid});*/
    let context = [];
    var querySlide = new AV.Query('Slides');
    querySlide.equalTo('owner', AV.User.current());
    querySlide.find().then(function (slides) {
      slides.forEach(function(slide) {
        var slideTitle = slide.get('title');
        var slideContent = slide.get('content');
        var slideId = slide.get('objectId');
        // handlebars context
        context.push([
          slideTitle,
          slideContent,
          slideId
        ]);
      })
      return context;
    }).then((context)=>{this.setState({context:context});})
  }
  deleteSlides(e){
    e.preventDefault();
    let {context}=this.state;
    /*let {slideslist,userid} = this.state;
    let index = parseInt(e.target.id);
    slideslist.splice(index,1);
    let slideslistStr = JSON.stringify(slideslist);
    localStorage.setItem(userid,slideslistStr);
    this.setState({slideslist:slideslist});*/
    let index = e.target.id;
    let index2 = e.target.parentNode.id;
    var slides = AV.Object.createWithoutData('Slides', index);
    slides.destroy().then(function (success) {
      context.splice(index2,1);
      return context;
  }).then((context)=>{this.setState({context:context})})
  .catch(function (error) {
    // 删除失败
  });
  }

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
    const {context} =this.state;
    const showslideslist = userwork? userwork : slideslist;
    const userworkList = context.length ?
    context.map((slides,index)=>(

      <Card key={index} >
        <Row>
        <Col span={16}>
          <Link to={`/player/${slides[2]}`}  target="_blank">
            <span>{index+1}&nbsp;&nbsp;&nbsp;{slides[0]}</span>
          </Link>
        </Col>
        <Col span={8} id={index}>
          <Link to={`/player/${slides[2]}`}  target="_blank">
            <Button style={{marginRight:10}}>播放</Button>
          </Link>
          <Link to={`/editor/${slides[2]}`}  target="_self">
            <Button style={{marginRight:10}}>编辑</Button>
          </Link>
          <Button id={slides[2]} style={{marginRight:10}} type="primary" onClick={this.showShareModal.bind(this)}>分享</Button>
          <Button id={slides[2]} style={{marginRight:60}} onClick={this.deleteSlides.bind(this)}>删除</Button>
        </Col>
        </Row>
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
                  <Col span={24}>{userworkList}
                  <Modal
                    title="复制链接分享演示文稿"
                    visible={this.state.linkVisible}
                    onOk={this.handleShareOk.bind(this)}
                    onCancel={this.handleShareCancel.bind(this)}
                  >
                    <p>localhost:8080/player/{this.state.slidesId}</p>
                  </Modal></Col>
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
