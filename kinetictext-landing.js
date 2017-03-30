import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {Panel, Button} from "react-bootstrap";
import Highlight from "react-syntax-highlight";
import Kinetictext from "react-kinetictext-effect";
//
import {fetchKinetictextHtml} from "../actions/actions";
import {fetchKinetictextPropsexampleJs} from "../actions/actions";
import {fetchKinetictextMethodsexampleJs} from "../actions/actions";
import {fetchKinetictextPropsDemoexampleJson} from "../actions/actions";
import {fetchKinetictextCssDemoexampleCss} from "../actions/actions";
import {fetchKinetictextDeployexampleHtml} from "../actions/actions";
import BackgroundCanvas from "../components/background-canvas";
import {updateState} from "../toolbox/toolbox";
import ReactGA from "react-ga";
//
class KinetictextLanding extends Component
{
	//*************************
	//*************************
	// Standard Methods
	//
	constructor(props)
	{
	    super(props);
	}
	getChildContext()
	{
		// empty
	}
	getInitialState()
	{
		return({});
	}
	componentWillMount()
	{
		this.props.fetchKinetictextHtml();
		this.props.fetchKinetictextPropsexampleJs();
		this.props.fetchKinetictextMethodsexampleJs();
		this.props.fetchKinetictextPropsDemoexampleJson();
		this.props.fetchKinetictextCssDemoexampleCss();
		this.props.fetchKinetictextDeployexampleHtml();
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		let kinetictextRef
			= scopeProxy.refs.exampleheadingkinetictext;
		let setViewLoaded
			= scopeProxy.context.setViewLoaded;
		let setLayoutMode
			= scopeProxy.context.setLayoutMode;
		let updateNavigationState
			= scopeProxy.context.updateNavigationState;
		let navigationSection
			= 0;
		//
		window.requestAnimationFrame(()=>
		{
			// Updating the section index this way lets the
			// state of the nagigation cluster fully initialize
			// before the activeKey value is updated. This is
			// necessary for it to be possible to navigate
			// back to the wares section from within a component
			// landing page when the component landing page is
			// directly accessed via the url bar in the browser.
			updateNavigationState(navigationSection);
		});
		let setviewTimeout =
			setTimeout(function()
			{
				setViewLoaded(true);
				setLayoutMode("full");
			},
			500);
		//
	}
	componentWillUpdate()
	{
		// empty
	}
	componentDidUpdate()
	{
		window.requestAnimationFrame(function()
		{
			// empty
		});
	}
	render()
	{
		let scopeProxy
			= this;
		let kinetictextHtml
			= scopeProxy.props.html;
		let jsonReady
			= true;
		let profileReady
			= true;
		let kinetictextPropsDemoExample
			= (scopeProxy.props.kinetictextPropsexampleJs !== undefined
			&& scopeProxy.props.kinetictextPropsexampleJs !== null)
			? scopeProxy.props.kinetictextPropsexampleJs
			: "loading...";
		let kinetictextMethodsDemoExample
			= (scopeProxy.props.kinetictextMethodsexampleJs !== undefined
			&& scopeProxy.props.kinetictextMethodsexampleJs !== null)
			? scopeProxy.props.kinetictextMethodsexampleJs
			: "loading...";
		let kinetictextPropsExample
			= (scopeProxy.props.kinetictextPropsDemoexampleJson !== undefined
			&& scopeProxy.props.kinetictextPropsDemoexampleJson !== null)
			? scopeProxy.props.kinetictextPropsDemoexampleJson
			: "loading...";
		let kinetictextCssDemoExample
			= (scopeProxy.props.kinetictextCssDemoexampleCss !== undefined
			&& scopeProxy.props.kinetictextCssDemoexampleCss !== null)
			? scopeProxy.props.kinetictextCssDemoexampleCss
			: "loading...";
		let kinetictextDeployExample
			= (scopeProxy.props.kinetictextDeployexampleHtml !== undefined
			&& scopeProxy.props.kinetictextDeployexampleHtml !== null)
			? scopeProxy.props.kinetictextDeployexampleHtml
			: "loading...";
		//
		let kinetictextExamplesampleProfile =
			{
				"Panel":
				{
					"Classname":"kinetic-text-panel"
				},
				"Morph":
				{
					"Portal":
					{
						"Perspective":"500px" // applied to the portal container for 3d depth transformation
					},
					"Style": // applied to each character in the sample as the initial state
					{
						"TranslateZ":"-500px", // overrides scale; null gives authority to scale;
						"ScaleX":"1",
						"ScaleY":"1",
						"Rotation":"720",
						"Opacity":"0",
						"Blur":"50px"
					},
					"Profile":
					{
						"Easing": // string, array ::http://easings.net/
						[
							"linear",
							"easeOutQuad",
							"easeOutBounce",
							"easeInOutBack",
							"easeOutElastic",
							"easeInCircle"
						],
						"Duration":function() // number, array, function
						{
							return(800);
						},
						"Delay":function() // number, array, function
						{
							return(0);
						},
						"Spaces":true,
						"Sequential":false
					},
					"Path": // string, array
					{
						"d":
						[
							"M 171.42857,40.933636 C 176.49149,-205.18873 149.52193,-393.65484 0,0",
							"M 131.42857,-370.49494 C 621.63372,-299.22974 865.12161,-203.29281 0,0",
							"m 128.57143,-193.35208 c 177.80729,2.84768 333.70358,46.38721 405.71428,245.714285 C 571.05161,196.68861 497.73833,269.46355 382.85714,315.21935 187.53368,385.42682 120.28689,339.20096 91.428571,258.07649 L 0,0",
							"M 674.28571,112.3622 662.85714,-84.780652 c -1.90476,-72.380958 -34.28571,-106.666668 -97.14285,-102.857148 -46.50943,9.73049 -95.52844,11.09567 -120,94.285719 L 420,60.933633 c -9.05253,77.133047 -60.07932,70.317557 -105.71429,74.285717 -26.66667,-4.31302 -53.33333,3.49525 -80,-51.428574 L 185.71429,-73.352081 C 172.84327,-95.950315 150.95427,-105.02157 122.85714,-104.78065 95.679055,-101.94699 84.405557,-88.510279 80,-70.494938 L 68.571429,46.647919 C 61.516425,62.202732 52.039141,72.307415 34.285714,63.790776 14.772999,46.880467 9.5779496,22.811325 0,0",
							"M 171.42857,40.933636 C 176.49149,-205.18873 149.52193,-393.65484 0,0",
							"m -255.47997,6.9335777 c -5.56425,-49.9029227 34.54141,-93.2528577 83.29034,-97.8783047 57.85852,-5.489793 107.784796,41.184084 112.466368,97.8784142 C -54.288876,72.744676 -107.54962,129.26328 -172.18975,133.98811 -245.95141,139.37968 -309.07303,79.519751 -313.83224,6.9335451 -319.18974,-74.777673 -252.72205,-144.50983 -172.18959,-149.297 -84.696929,-154.49791 -9.3029759,-84.870056 0,0",
						]
					},
					"Change":function(event)
					{
						// empty
					},
					"Complete":function(event)
					{
						// empty
					}
				},
				"Ready":function(event)
				{
					// empty
				}
			}
		//
		let kinetictextExamplesequentialProfile =
			{
				"Panel":
				{
					"Classname":"kinetic-text-panel"
				},
				"Morph":
				{
					"Portal":
					{
						"Perspective":"500px" // applied to the portal container for 3d depth transformation
					},
					"Style": // applied to each character in the sample as the initial state
					{
						"TranslateZ":"-500px", // overrides scale; null gives authority to scale;
						"ScaleX":"1",
						"ScaleY":"1",
						"Rotation":"720",
						"Opacity":"0",
						"Blur":"50px"
					},
					"Profile":
					{
						"Easing": // string, array ::http://easings.net/
						[
							"linear",
							"easeOutQuad",
							"easeOutBounce",
							"easeInOutBack",
							"easeOutElastic",
							"easeInCircle"
						],
						"Duration":function() // number, array, function
						{
							return(400);
						},
						"Delay":function() // number, array, function
						{
							return(0);
						},
						"Spaces":true,
						"Sequential":true
					},
					"Path": // string, array
					{
						"d":
						[
							"M 171.42857,40.933636 C 176.49149,-205.18873 149.52193,-393.65484 0,0",
							"M 131.42857,-370.49494 C 621.63372,-299.22974 865.12161,-203.29281 0,0",
							"m 128.57143,-193.35208 c 177.80729,2.84768 333.70358,46.38721 405.71428,245.714285 C 571.05161,196.68861 497.73833,269.46355 382.85714,315.21935 187.53368,385.42682 120.28689,339.20096 91.428571,258.07649 L 0,0",
							"M 674.28571,112.3622 662.85714,-84.780652 c -1.90476,-72.380958 -34.28571,-106.666668 -97.14285,-102.857148 -46.50943,9.73049 -95.52844,11.09567 -120,94.285719 L 420,60.933633 c -9.05253,77.133047 -60.07932,70.317557 -105.71429,74.285717 -26.66667,-4.31302 -53.33333,3.49525 -80,-51.428574 L 185.71429,-73.352081 C 172.84327,-95.950315 150.95427,-105.02157 122.85714,-104.78065 95.679055,-101.94699 84.405557,-88.510279 80,-70.494938 L 68.571429,46.647919 C 61.516425,62.202732 52.039141,72.307415 34.285714,63.790776 14.772999,46.880467 9.5779496,22.811325 0,0",
							"M 171.42857,40.933636 C 176.49149,-205.18873 149.52193,-393.65484 0,0",
							"m -255.47997,6.9335777 c -5.56425,-49.9029227 34.54141,-93.2528577 83.29034,-97.8783047 57.85852,-5.489793 107.784796,41.184084 112.466368,97.8784142 C -54.288876,72.744676 -107.54962,129.26328 -172.18975,133.98811 -245.95141,139.37968 -309.07303,79.519751 -313.83224,6.9335451 -319.18974,-74.777673 -252.72205,-144.50983 -172.18959,-149.297 -84.696929,-154.49791 -9.3029759,-84.870056 0,0",
						]
					},
					"Change":function(event)
					{
						// empty
					},
					"Complete":function(event)
					{
						// empty
					}
				},
				"Ready":function(event)
				{
					// empty
				}
			}
		//
		let kinetictextExamplerandomizedProfile =
			{
				"Panel":
				{
					"Classname":"kinetic-text-panel"
				},
				"Morph":
				{
					"Portal":
					{
						"Perspective":"500px" // applied to the portal container for 3d depth transformation
					},
					"Style": // applied to each character in the sample as the initial state
					{
						"TranslateZ":"-500px", // overrides scale; null gives authority to scale;
						"ScaleX":"1",
						"ScaleY":"1",
						"Rotation":"720",
						"Opacity":"0",
						"Blur":"30px"
					},
					"Profile":
					{
						"Easing": // string, array ::http://easings.net/
						[
							"linear",
							"easeOutQuad",
							"easeOutBounce",
							"easeInOutBack",
							"easeOutElastic",
							"easeInCircle"
						],
						"Duration":function() // number, array, function
						{
							return(Math.floor((Math.random() * 3000) + 500));
						},
						"Delay":function() // number, array, function
						{
							return(Math.floor((Math.random() * 3000)	+ 500));
						},
						"Spaces":true,
						"Sequential":false
					},
					"Path": // string, array
					{
						"d":
						[
							"M 171.42857,40.933636 C 176.49149,-205.18873 149.52193,-393.65484 0,0",
							"M 131.42857,-370.49494 C 621.63372,-299.22974 865.12161,-203.29281 0,0",
							"m 128.57143,-193.35208 c 177.80729,2.84768 333.70358,46.38721 405.71428,245.714285 C 571.05161,196.68861 497.73833,269.46355 382.85714,315.21935 187.53368,385.42682 120.28689,339.20096 91.428571,258.07649 L 0,0",
							"M 674.28571,112.3622 662.85714,-84.780652 c -1.90476,-72.380958 -34.28571,-106.666668 -97.14285,-102.857148 -46.50943,9.73049 -95.52844,11.09567 -120,94.285719 L 420,60.933633 c -9.05253,77.133047 -60.07932,70.317557 -105.71429,74.285717 -26.66667,-4.31302 -53.33333,3.49525 -80,-51.428574 L 185.71429,-73.352081 C 172.84327,-95.950315 150.95427,-105.02157 122.85714,-104.78065 95.679055,-101.94699 84.405557,-88.510279 80,-70.494938 L 68.571429,46.647919 C 61.516425,62.202732 52.039141,72.307415 34.285714,63.790776 14.772999,46.880467 9.5779496,22.811325 0,0",
							"M 171.42857,40.933636 C 176.49149,-205.18873 149.52193,-393.65484 0,0",
							"m -255.47997,6.9335777 c -5.56425,-49.9029227 34.54141,-93.2528577 83.29034,-97.8783047 57.85852,-5.489793 107.784796,41.184084 112.466368,97.8784142 C -54.288876,72.744676 -107.54962,129.26328 -172.18975,133.98811 -245.95141,139.37968 -309.07303,79.519751 -313.83224,6.9335451 -319.18974,-74.777673 -252.72205,-144.50983 -172.18959,-149.297 -84.696929,-154.49791 -9.3029759,-84.870056 0,0",
						]
					},
					"Change":function(event)
					{
						// empty
					},
					"Complete":function(event)
					{
						// empty
					}
				},
				"Ready":function(event)
				{
					// empty
				}
			}
		//
		let kinetictextExamplestatesProfile =
			{
				"Panel":
				{
					"Classname":"kinetic-text-panel"
				},
				"Morph":
				{
					"Portal":
					{
						"Perspective":"500px" // applied to the portal container for 3d depth transformation
					},
					"Style": // applied to each character in the sample as the initial state
					{
						"TranslateZ":"-500px", // overrides scale; null gives authority to scale;
						"ScaleX":"1",
						"ScaleY":"1",
						"Rotation":"720",
						"Opacity":".5",
						"Blur":"10px"
					},
					"Profile":
					{
						"Easing": // string, array ::http://easings.net/
						[
							"linear",
							"easeOutQuad",
							"easeOutBounce",
							"easeInOutBack",
							"easeOutElastic",
							"easeInCircle"
						],
						"Duration":function() // number, array, function
						{
							return(2500);
						},
						"Delay":function() // number, array, function
						{
							return(100);
						},
						"Spaces":true,
						"Sequential":false
					},
					"Path": // string, array
					{
						"d":
						[
							"M 171.42857,40.933636 C 176.49149,-205.18873 149.52193,-393.65484 0,0",
							"M 131.42857,-370.49494 C 621.63372,-299.22974 865.12161,-203.29281 0,0",
							"m 128.57143,-193.35208 c 177.80729,2.84768 333.70358,46.38721 405.71428,245.714285 C 571.05161,196.68861 497.73833,269.46355 382.85714,315.21935 187.53368,385.42682 120.28689,339.20096 91.428571,258.07649 L 0,0",
							"M 674.28571,112.3622 662.85714,-84.780652 c -1.90476,-72.380958 -34.28571,-106.666668 -97.14285,-102.857148 -46.50943,9.73049 -95.52844,11.09567 -120,94.285719 L 420,60.933633 c -9.05253,77.133047 -60.07932,70.317557 -105.71429,74.285717 -26.66667,-4.31302 -53.33333,3.49525 -80,-51.428574 L 185.71429,-73.352081 C 172.84327,-95.950315 150.95427,-105.02157 122.85714,-104.78065 95.679055,-101.94699 84.405557,-88.510279 80,-70.494938 L 68.571429,46.647919 C 61.516425,62.202732 52.039141,72.307415 34.285714,63.790776 14.772999,46.880467 9.5779496,22.811325 0,0",
							"M 171.42857,40.933636 C 176.49149,-205.18873 149.52193,-393.65484 0,0",
							"m -255.47997,6.9335777 c -5.56425,-49.9029227 34.54141,-93.2528577 83.29034,-97.8783047 57.85852,-5.489793 107.784796,41.184084 112.466368,97.8784142 C -54.288876,72.744676 -107.54962,129.26328 -172.18975,133.98811 -245.95141,139.37968 -309.07303,79.519751 -313.83224,6.9335451 -319.18974,-74.777673 -252.72205,-144.50983 -172.18959,-149.297 -84.696929,-154.49791 -9.3029759,-84.870056 0,0",
						]
					},
					"Change":function(event)
					{
						// empty
					},
					"Complete":function(event)
					{
						// empty
					}
				},
				"Ready":function(event)
				{
					// empty
				}
			}
		//
		let backgroundcanvasProfile =
			{
				"Background":
				{
					"Color":"rgba(245,245,255,1)"
				},
				"Watermark":
				{
					"Name":"kinetictext",
					"Image":"anvil-watermark-filtered_480x363.png"
				}
			}
		//
		if(jsonReady === true
		&& profileReady === true)
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					<div id="wares-landing-content-conainer" ref="wareslandingcontent" className="wares-landing-content">
						<div id="ware-introduction-container" ref="wareintroduction" className="ware-introduction">
							<div id="ware-landing-html-container" ref="warelandinghtml" dangerouslySetInnerHTML={{"__html":kinetictextHtml}} className="ware-landing-html"/>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Properties (props)" className="detail-heading">
								<Highlight lang="json" value={kinetictextPropsExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Methods" className="detail-heading">
								<Highlight lang="js" value={"let kinetictextsampleRef = this.refs.reactkinetictext;"}/>
								<hr/>
								<Highlight lang="js" value={kinetictextMethodsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Properties (props)" className="detail-heading">
								<Highlight lang="js" value={kinetictextPropsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Styles (css)" className="detail-heading">
								<Highlight lang="css" value={kinetictextCssDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={true} header="Deploy" className="detail-heading">
								<Highlight lang="jsx" value={"npm install react-kinetictext-effect -s"}/>
								<hr/>
								<Highlight lang="js" value={"import Kinetictext from 'react-kinetictext-effect';"}/>
								<hr/>
								<Highlight lang="html" value={kinetictextDeployExample}/>
							</Panel>
						</div>
						<div id="kinetictext-showcase-container" ref="kinetictextshowcase" className="kinetictext-showcase">
							<div id="kinetictext-heading-container" ref="kinetictextheading" className="kinetictext-heading">
								<div id="kinetictext-heading-headline-container" ref="kinetictextheadingheadline" className="kinetictext-heading-headline">
									Demo
								</div>
							</div>
							<hr/>
							<div id="demo-title-container" className="demo-title">Simultaneous</div>
							<Button className="kinetictext-animate-button" onClick={this.animateExamplesample.bind(this)}>Animate</Button>
							<div id="kinetictext-examplesample-container" className="kinetictext-examplesample">
								<Kinetictext id="examplesample-kinetictext-container" ref="examplesamplekinetictext" {...kinetictextExamplesampleProfile}>
									<div id="example-heading-container" className="kinetic-text-sample">
										sample
									</div>
								</Kinetictext>
							</div>
							<hr/>
							<div id="demo-title-container" className="demo-title">Sequential</div>
							<Button className="kinetictext-animate-button" onClick={this.animateSequential.bind(this)}>Animate</Button>
							<div id="kinetictext-examplesample-container" className="kinetictext-examplesample">
								<Kinetictext id="sequential-kinetictext-container" ref="examplesequentialkinetictext" {...kinetictextExamplesequentialProfile}>
									<div id="example-heading-container" className="kinetic-text-sample">
										sample
									</div>
								</Kinetictext>
							</div>
							<hr/>
							<div id="demo-title-container" className="demo-title">Randomized</div>
							<Button className="kinetictext-animate-button" onClick={this.animateRandomized.bind(this)}>Animate</Button>
							<div id="kinetictext-examplesample-container" className="kinetictext-examplesample">
								<Kinetictext id="randomized-kinetictext-container" ref="examplerandomizedkinetictext" {...kinetictextExamplerandomizedProfile}>
									<div id="example-heading-container" className="kinetic-text-sample">
										sample
									</div>
								</Kinetictext>
							</div>
							<hr/>
							<div id="demo-title-container" className="demo-title">Sample States</div>
							<div id="kinetictext-navcluster-container" className="kinetictext-navcluster">
								<Button className="kinetictext-cluster-button" onClick={this.animateSamplestates.bind(this)}>Animate</Button>
								<Button className="kinetictext-cluster-button" onClick={this.stageSamplestates.bind(this)}>Stage</Button>
							</div>
							<div id="kinetictext-examplestates-container" className="kinetictext-examplesample">
								<Kinetictext id="states-kinetictext-container" ref="examplestateskinetictext" {...kinetictextExamplestatesProfile}>
									<div id="example-heading-container" className="kinetic-text-sample">
										sample
									</div>
								</Kinetictext>
							</div>
							<hr/>
						</div>
					</div>
					<BackgroundCanvas ref="backgroundcanvas" {...backgroundcanvasProfile}/>
				</div>
			);
		}
		else
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					"Loading Kinetictext Content..."
				</div>
			);
		}
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	animateExamplesample()
	{
		let examplesampleRef
			= this.refs.examplesamplekinetictext;
		//
		ReactGA.event(
		{
		  "category":"kinetictext_action",
		  "action":"animate_clicked",
		  "label":"example_sample"
		});
		examplesampleRef.animateSample();		
	}
	animateSequential()
	{
		let examplesequentialRef
			= this.refs.examplesequentialkinetictext;
		//
		ReactGA.event(
		{
		  "category":"kinetictext_action",
		  "action":"animate_clicked",
		  "label":"sequential_sample"
		});
		examplesequentialRef.animateSample();
	}
	animateRandomized()
	{
		let examplerandomizedRef
			= this.refs.examplerandomizedkinetictext;
		//
		ReactGA.event(
		{
		  "category":"kinetictext_action",
		  "action":"animate_clicked",
		  "label":"randomized_sample"
		});
		examplerandomizedRef.animateSample();
	}
	animateSamplestates()
	{
		let examplestatesRef
			= this.refs.examplestateskinetictext;
		//
		ReactGA.event(
		{
		  "category":"kinetictext_action",
		  "action":"animate_clicked",
		  "label":"stage_sample"
		});
		examplestatesRef.animateSample();
	}
	stageSamplestates()
	{
		let examplestatesRef
			= this.refs.examplestateskinetictext;
		//
		ReactGA.event(
		{
		  "category":"kinetictext_action",
		  "action":"stage_clicked",
		  "label":"stage_sample"
		});
		examplestatesRef.stageSample();
	}
	//*************************
	//*************************
	// Assignments
	//
	static contextTypes =
		{
			"transitionBody":PropTypes.func,
			"updateNavigationState":PropTypes.func,
			"setViewLoaded":PropTypes.func,
			"setLayoutMode":PropTypes.func
		}
	//
}
function mapAxiosstateToReactprops(axiosState)
{
	// This function is only called when the axios
	// response updates the application state. Once
	// this function is called, the component state
	// is updated which causes the render() function
	// to execute.
	return(
	{
		// When the application state (state.posts.all) is
		// updated by the axios promise, the promise response
		// is assigned the component state this.content.posts.
		"html":axiosState.content.html,
		"kinetictextPropsexampleJs":axiosState.content.kinetictextPropsexampleJs,
		"kinetictextMethodsexampleJs":axiosState.content.kinetictextMethodsexampleJs,
		"kinetictextPropsDemoexampleJson":axiosState.content.kinetictextPropsDemoexampleJson,
		"kinetictextCssDemoexampleCss":axiosState.content.kinetictextCssDemoexampleCss,
		"kinetictextDeployexampleHtml":axiosState.content.kinetictextDeployexampleHtml
	});
}
export default connect(mapAxiosstateToReactprops,
{
	"fetchKinetictextHtml":fetchKinetictextHtml,
	"fetchKinetictextPropsexampleJs":fetchKinetictextPropsexampleJs,
	"fetchKinetictextMethodsexampleJs":fetchKinetictextMethodsexampleJs,
	"fetchKinetictextPropsDemoexampleJson":fetchKinetictextPropsDemoexampleJson,
	"fetchKinetictextCssDemoexampleCss":fetchKinetictextCssDemoexampleCss,
	"fetchKinetictextDeployexampleHtml":fetchKinetictextDeployexampleHtml
})(KinetictextLanding);