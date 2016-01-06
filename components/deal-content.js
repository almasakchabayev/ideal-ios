import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Deals from './deals'
import {openAnimation} from './animations'
import Test from './test'
import Info from './info'
import Comments from './comments'
import Address from './address'
import {deal} from './mock'

let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View,
  LayoutAnimation,
  TouchableOpacity,
  ScrollView,
  Image,
  SegmentedControlIOS,
  DeviceEventEmitter
} = React;
export default class DealContent extends React.Component{
	state={num:0,count:0,commentCount:0}
	changeTab(num){
		// this.requestAnimationFrame(()=>{
			LayoutAnimation.configureNext(openAnimation)
			this.setState({num:num,count:this.state.count+1,commentCount:num===2?this.state.commentCount+1:this.state.commentCount},()=>{
				if(num===2){
					this.props.openCommentBox()
				}else{
					this.props.closeCommentBox()
				}	
			})
		// })
		
	}
	render(){
		// console.log(this.props.deal);
		let tabView,commentBox;
		if(this.state.num===0){
			tabView=<Info dealId={this.props.deal.id} count={this.state.count} />

		}else if (this.state.num===1){
			tabView=<Address/>
		}else{
			tabView=<Comments dealId={this.props.deal.id} count={this.state.commentCount} />
			// this.setTimeout(()=>this.props.openCommentBox(),300)
		
		}
		return (	
				<View style={{marginTop:0,marginBottom:20}}>
				   
				 
					
				{tabView}	
					
				</View>
				


     		)
	}
}
Object.assign(DealContent.prototype, TimerMixin);

