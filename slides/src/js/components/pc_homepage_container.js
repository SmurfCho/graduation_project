import React from "react";
import { Row,Col } from "antd";
import { Tabs,Carousel ,Card} from "antd";
const TabPane = Tabs.TabPane;
import { Link } from "react-router-dom";
import AV from "leancloud-storage";
var { Query, User} = AV;

export default class PCHomepageContainer extends React.Component{
	constructor(){
    super();
    this.state = {
      userwork: "",
      userid:"",
      context:[],
    };
  };
	componentDidMount(){
    let context = [];
    var querySlide = new AV.Query('Slides');
		querySlide.include('owner');
    querySlide.find().then(function (slides) {
      slides.forEach(function(slide) {
        var slideTitle = slide.get('title');
        var slideId = slide.get('objectId');
				var userNickName = slide.get('userName');
        // handlebars context
        context.push([
          slideTitle,
          slideId,
					userNickName
        ]);
      })
      return context;
    }).then((context)=>{this.setState({context:context});})
  }
	render(){
		const settings = {
      dots:true,
			infinite:true,
			speed: 500,
			slidesToShow:1,
			autoplay:true,
		}
    const {context} =this.state;
    const userworkList = context.length ?
    context.map((slides,index)=>(
      <Card key={index} >
        <Row>
        <Col span={18}>
          <Link to={`/player/${slides[1]}`}  target="_blank">
            <span>{index+1}&nbsp;&nbsp;&nbsp;{slides[0]}</span>
          </Link>
        </Col>
        <Col span={6} id={index}>
					<span>作者：{slides[2]}</span>
        </Col>
        </Row>
      </Card>
    ))
    :
    <Card>
      <p>暂无作品展示</p>
    </Card>
		return(

			<div>
				<Row>
				<Col span={2}></Col>
				<Col span={20}>
        <div class="Container">
          <div class="carousel">
            <Carousel {...settings}>
            <div><img class="carousel" src="./src/images/ca2.png" alt="carousel_1"/></div>
            <div><img class="carousel" src="./src/images/ca1.png" alt="carousel_2"/></div>
            <div><img class="carousel" src="./src/images/ca4.png" alt="carousel_3"/></div>
            <div><img class="carousel" src="./src/images/ca3.png" alt="carousel_4"/></div>
            </Carousel>
          </div>
        </div>
        </Col>
				<Col span={2}></Col>
				</Row>
				<Row>
				<Col span={2}></Col>
				<Col span={20}>
				<Tabs>
					<TabPane tab="作品列表" key="1">
						<div class="comment">
							<Row>
								<Col span={24}>{userworkList}</Col>
							</Row>
						</div>
					</TabPane>
					</Tabs>
					</Col>
				</Row>
			</div>
		);
	}
}
