import React from 'react';
import { Row,Col } from 'antd';
import { Tabs,Carousel } from 'antd';
const TabPane = Tabs.TabPane;

export default class PCHomepageContainer extends React.Component{
	render(){
		const settings = {
      dots:true,
			infinite:true,
			speed: 500,
			slidesToShow:1,
			autoplay:true
		}
		return(
			<div>
				<Row>
				<Col span={2}></Col>
				<Col span={20}>
        <div class="Container">
          <div class="carousel">
            <Carousel {...settings}>
            <div><img class="carousel" src="./src/images/carbac1.jpg" alt="carousel_1"/></div>
            <div><img class="carousel" src="./src/images/carbac2.jpg" alt="carousel_2"/></div>
            <div><img class="carousel" src="./src/images/carbac3.jpg" alt="carousel_3"/></div>
            <div><img class="carousel" src="./src/images/carbac4.jpg" alt="carousel_4"/></div>
            </Carousel>
          </div>
        </div>
        </Col>
				<Col span={2}></Col>
				</Row>
			</div>
		);
	}
}
