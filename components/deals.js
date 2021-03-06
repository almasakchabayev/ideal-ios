import React from 'react-native'
import Deal from './deal'
import {data} from './mock'
import {openAnimation,closeImageAnimation} from './animations'
import TimerMixin from 'react-timer-mixin'
import Navbar from './navbar'
import Spinner from 'react-native-spinkit';
import Loading from './loading'
let EventEmitter = require('EventEmitter');
let UIManager = require('NativeModules').UIManager;
let {
  AppRegistry,
  StyleSheet,
  LayoutAnimation,
  Text,
  View,
  ScrollView,
  StatusBarIOS,
  InteractionManager
} = React;
export default class Deals extends React.Component{
	state={canOpen:true,renderPlaceholderOnly: true,loadNewer:false}
	static contextTypes={
    	toggleTabs: React.PropTypes.func
  	}
	componentDidMount(){
					// LayoutAnimation.configureNext(openAnimation);

			 InteractionManager.runAfterInteractions(() => {
				 		this.setTimeout(()=>{
				 			this.setState({renderPlaceholderOnly:false})
				 		},200)
				 		
	    		});
	}	

	moveUpPrev(item,pagey){
		let prev=data.indexOf(item)-1			
		if(prev>-1){
			let prevRef=''+data[prev].id
			this.refs[prevRef].moveUp(pagey)
			let prev1=data.indexOf(item)-2
			if(prev1>-1){
				let prevRef1=''+data[prev1].id
				this.refs[prevRef1].moveUp(pagey)
			}
		}
		return;
	}
	moveDownPrev(item,pagey){
		let prev=data.indexOf(item)-1			
		if(prev>-1){
			let prevRef=''+data[prev].id
			this.refs[prevRef].moveDown(pagey)
			let prev1=data.indexOf(item)-2
			if(prev1>-1){
				let prevRef1=''+data[prev1].id
				this.refs[prevRef1].moveDown(pagey)
			}
		}
		return;
	}
	hideNext(item,pagey){
		if(pagey<60){
			let nextRef=''+data[data.indexOf(item)+1].id
			this.refs[nextRef].hide()
		}
		return;
	}
	unHideNext(item){
		if(data[data.indexOf(item)+1]){
			let nextRef=''+data[data.indexOf(item)+1].id 
			if(this.refs[nextRef].isHidden()){
				this.refs[nextRef].unHide()
			}
		}
		return;
	}
	viewDeal(item,refS){
			this.toggleScroll(false)
			// this.context.toggleTabs()
			let handle = React.findNodeHandle(this.refs[refS]);
			UIManager.measure(handle,(x,y,width,height,pagex,pagey)=>{
				LayoutAnimation.configureNext(openAnimation);
				this.refs[refS].toggleOpen(true)
				this.moveUpPrev(item,pagey)
				this.hideNext(item,pagey)
				if(this.props.navbar){
					this.refs['navbar'].destroy()
					this.refs[refS].animateOpen(pagey,75*k)
				}else if(this.props.search){
					this.refs[refS].animateOpen(pagey,125*k)
				}else{
					this.refs[refS].animateOpen(pagey,25*k)
				}
				this.props.toggleSearch && this.props.toggleSearch(true)
			})
	
	}
	closeDeal(item,refS){
			this.toggleScroll(true)
			this.refs[refS].toggleScroll(false)
			this.refs[refS].closeCommentBox()

			// this.context.toggleTabs()
			let handle = React.findNodeHandle(this.refs[refS]);
			UIManager.measure(handle,(x,y,width,height,pagex,pagey)=>{
				LayoutAnimation.configureNext(openAnimation);
				this.refs[refS].toggleOpen(false)
				this.refs[refS].animateScrollToTop()
				this.unHideNext(item)
				this.moveDownPrev(item,pagey)
				this.refs[refS].animateClose(pagey)
				if(this.props.navbar){
					this.refs['navbar'].revive()
				}
				this.props.toggleSearch && this.props.toggleSearch(false)
			
			})

	}
	toggleScroll(val){
		this.refs['scroll'].setNativeProps({
			scrollEnabled:val,
		})

	}
	render(){
		this.canOpen=1
		// console.log('renderign deal list')
		this.y=this.y || 0;
		if(!this.state.renderPlaceholderOnly){
			return (
			<View style={{flex:1,backgroundColor:'e8e8ee',
				// marginTop:this.props.marginTop?this.props.marginTop:0
			}}>

				{this.props.navbar ? <Navbar ref='navbar' title={this.props.title} navigator={this.props.navigator}/>:null}
				<ScrollView
				keyboardShouldPersistTaps={true}
				scrollEnabled={true}
				automaticallAdjustContentInsets={true}
				contentContainerStyle={{paddingBottom:60}}
				onScroll={(e)=>{
					// console.log(e.nativeEvent.contentOffset.y)
				}}
				scrollEventThrottle={16}
				ref='scroll'>
					{this.props.data.map((deal,i)=>{
						let refS = ''+deal.id
						return (
							<Deal ref={refS} navigator={this.props.navigator}
							 key={deal.id} deal={deal}  
							 isOpen={false}
							 viewDeal={!this.state.loadNewer?this.viewDeal.bind(this,deal,refS):null}
							 closeDeal={this.closeDeal.bind(this,deal,refS)}
							 />
							)						
					})}
				</ScrollView>
			</View>
			)
		}	
		return (<View>
			{this.props.navbar ? <Navbar ref='navbar' title={this.props.title} navigator={this.props.navigator}/>:null}
		 <View style={{backgroundColor:'e8e8ee',flexDirection:'column',flex:1,alignItems:'center',justifyContent:'flex-start',height:600*k}}>
		 	   <Spinner style={{marginTop:15*k}} isVisible={this.state.renderPlaceholderOnly} size={30} type={'WanderingCubes'} color={'0679a2'}/>       
	      </View>
			</View>)

	}




}
			// {this.state.loadNewer?	 <Spinner style={{marginTop:5*k,alignSelf:'center',marginBottom:5}} isVisible={this.state.loadNewer} size={30} type={'WanderingCubes'} color={'0679a2'}/>:null}
// 



Object.assign(Deals.prototype, TimerMixin);


