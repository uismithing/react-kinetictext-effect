import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {VelocityComponent, VelocityTransitionGroup, velocityHelpers} from "velocity-react";
import {VelocityAnimate, VelocityUi} from "velocity-animate";
import _ from "lodash";
//
//*************************
//*************************
// Nonpublished Imports
//
function updateState(ScopeProxy, Parcel)
{
	let existingState
		= (ScopeProxy.state !== null)
		? _.cloneDeep(ScopeProxy.state)
		: {};
	let adjustedState
		= _.merge(existingState, _.cloneDeep(Parcel));
	//
	try
	{
		ScopeProxy.setState(adjustedState);
	}
	catch(event)
	{
		console.warn("::react-kinetictext:problem::updateState:", event);
	}
}
function watch(Testfunction)
{
	let watchCore =
		{
			"Match":function(Target, Complete, ExpireAt)
			{
				let intervalCount
					= 0;
				let maximumAttempts
					= (ExpireAt !== undefined)
					? ExpireAt
					: 2000;
				//
				let watchInterval =
					setInterval(function()
					{
						if(Testfunction() === Target)
						{
							Complete();
							//
							clearInterval(watchInterval);
						}
						if(intervalCount >= maximumAttempts)
						{
							console.warn("react-kinetictext.js::watch::exceeded watch limit timeout::action halted.")
							//
							clearInterval(watchInterval);
						}
						intervalCount++;
					},
					1);
				//
			}
		}
	//
	return watchCore;
}
//
//*************************
//*************************
// Exports
//
export default class Kinetictext extends Component
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
		// empty
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		//
		updateState(scopeProxy,
		{
			"Ready":false,
			"Panel":
			{
				"Classname":this.props.Panel.Classname
			},
			"Sample":
			{
				"Child":this.props.children,
				"Style":this.props.Morph.Style,
				"Ready":this.props.Ready,
				"Process":false
			},
			"Morph":
			{
				"Index":0,
				"Profile":this.props.Morph.Profile,
				"Portal":this.props.Morph.Portal,
				"Path":this.props.Morph.Path.d,
				"Change":this.props.Morph.Change,
				"Complete":this.props.Morph.Complete,
				"Profiles":[]
			}
		});
	}
	componentWillUpdate()
	{
		// empty
	}
	componentDidUpdate()
	{
		let scopeProxy
			= this;
		//
		window.requestAnimationFrame(function()
		{
			if(scopeProxy.state !== undefined
			&& scopeProxy.state.Ready === false)
			{
				updateState(scopeProxy,
				{
					"Ready":true
				});
				scopeProxy.state.Sample.Ready(scopeProxy.state.Sample.Child.props.children);
			}
		});
	}
	render()
	{
		let scopeProxy
			= this;
		let childElementCount
			= 0;
		let morphElementCount
			= 0;
		let kinetictextId
			= this.props.id;
		let processSample
			= _.has(this, "state.Sample.Process")
			? this.state.Sample.Process
			: false;
		let kinetictextpanelClassname
			= _.has(this, "state.Panel.Classname")
			? this.state.Panel.Classname
			: null;
		let kinetictextsampleStyle
			= _.has(this, "state.Sample.Style")
			? this.state.Sample.Style
			: null;
		let sampleChild
			= _.has(this, "state.Sample.Child")
			? this.state.Sample.Child.props.children.split("")
			: [];
		let samplePerspective
			= _.has(this, "state.Morph.Portal.Perspective")
			? this.state.Morph.Portal.Perspective
			: "0px";
		let childElements
			= null;
		//
		let portalmorphProfileOnmount =
			{
				"runOnMount":false
			}
		//
		if(processSample === true)
		{
			childElements =
			sampleChild.map((childElement)=>
			{
				let morphElement
					= null;
				let morphelementId
					= kinetictextId.concat("_morph-element_", childElementCount.toString(), "-container");
				let morphelementhostId
					= kinetictextId.concat("_morph-elementhost_", childElementCount.toString(), "-container");
				let morphPath
					= _.has(this, "state.Morph.Path")
					? this.state.Morph.Path
					: null;
				let adjustedMorphPath
					= (typeof morphPath === "object"
					&& morphPath !== null)
					? morphPath[childElementCount]
					: morphPath;
				let pathId
					= kinetictextId.concat("_child-path_", childElementCount.toString(), "-svg");
				let morphProfile
					= scopeProxy.state.Morph.Profiles[childElementCount];
				let velocitychildElementId
					= kinetictextId.concat("_velocity-element-", childElement);
				//
				let pathStyle =
					{
						"fill":"none",
						"fill-rule":"evenodd",
						"stroke-width":"1px",
						"stroke":"rgba(0,0,0,1)",
						"stroke-linecap":"butt",
						"stroke-linejoin":"miter",
						"stroke-opacity":1
					}
				//
				let morphelementStyle =
					{
						"display":"inline-block",
						"position":"relative"
					}
				//
				let morphelementhostStyle =
					{
						"display":"inline-block",
						"position":"relative",
						"transform-style":"preserve-3d",
						"perspective":samplePerspective
					}
				//
				let velocitychildStyle =
					{
						"opacity":"0"
					}
				//
				if(childElement !== " ")
				{
					morphElement =
					<div id={morphelementhostId} style={morphelementhostStyle}>
						<div id={morphelementId} style={morphelementStyle}>
							{childElement}
						</div>
						<svg width="0px" height="0px">
							<g id="path-layer">
								<path id={pathId} style={pathStyle} d={adjustedMorphPath}/>
							</g>
						</svg>
						<VelocityComponent {...morphProfile}>
							<div id={velocitychildElementId} style={velocitychildStyle}></div>
						</VelocityComponent>
					</div>
				}
				else
				{
					morphElement =
					<div id={morphelementhostId} style={morphelementhostStyle}>
						<div id={morphelementId} style={morphelementStyle}>
							&nbsp;
						</div>
						<svg width="0px" height="0px">
							<g id="path-layer">
								<path id={pathId} style={pathStyle} d={adjustedMorphPath}/>
							</g>
						</svg>
						<VelocityComponent {...morphProfile}>
							<div id={velocitychildElementId} style={velocitychildStyle}></div>
						</VelocityComponent>
					</div>
				}
				childElementCount++;
				//
				return morphElement;
			});
		}
		else
		{
			childElements
			= this.props.children;
		}
		return(
			<div id="kinetictext-panel-container" ref="kinetictextpanel" className={kinetictextpanelClassname}>
				<div id="kinetictext-sample-container" ref="kinetictextsample" className={this.props.children.props.className}>
					{childElements}
				</div>
			</div>
		);
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	setListeners()
	{
		let scopeProxy
			= this;
		//
	}
	animateSample()
	{
		let scopeProxy
			= this;
		let kinetictextId
			= this.props.id;
		let sampleChild
			= _.has(this, "state.Sample.Child")
			? this.state.Sample.Child.props.children.split("")
			: [];
		let sampleLength
			= sampleChild.length;
		let velocitychildElementId
			= kinetictextId.concat("_velocity-element-", sampleChild[(sampleLength - 1)]);
		let processSample
			= _.has(this, "state.Sample.Process")
			? this.state.Sample.Process
			: false;
		//
		if(processSample === false)
		{
			updateState(scopeProxy,
			{
				"Sample":
				{
					"Process":true
				}
			});
			watch(function()
			{
				let beginAnimate
					= scopeProxy.state.Sample.Process;
				//
				return beginAnimate;
			}).
			Match(true, function(event)
			{
				scopeProxy.resetProfiles();
			});
		}
		watch(function()
		{
			let velocitychildElement
				= document.getElementById(velocitychildElementId);
			let lastelementOpacity
				= parseInt(velocitychildElement.style.opacity);
			//
			return lastelementOpacity;
		}).
		Match(0, function(event)
		{
			window.requestAnimationFrame(function()
			{
				scopeProxy.morphSample();
			});
		});
	}
	morphSample()
	{
		let scopeProxy
			= this;
		let kinetictextId
			= this.props.id;
		let sampleChild
			= _.has(this, "state.Sample.Child")
			? this.state.Sample.Child.props.children.split("")
			: [];
		let morphIndex
			= _.has(this, "state.Morph.Index")
			? this.state.Morph.Index
			: 0;
		let sampleLength
			= sampleChild.length;
		let childTranslateZ
			= _.has(this, "state.Sample.Style.TranslateZ")
			? this.state.Sample.Style.TranslateZ
			: null;
		let childOpacity
			= _.has(this, "state.Sample.Style.Opacity")
			? this.state.Sample.Style.Opacity
			: null;
		let childBlur
			= _.has(this, "state.Sample.Style.Blur")
			? this.state.Sample.Style.Blur
			: null;
		let childRotation
			= _.has(this, "state.Sample.Style.Rotation")
			? this.state.Sample.Style.Rotation
			: null;
		let childScaleX
			= _.has(this, "state.Sample.Style.ScaleX")
			? this.state.Sample.Style.ScaleX
			: null;
		let childScaleY
			= _.has(this, "state.Sample.Style.ScaleY")
			? this.state.Sample.Style.ScaleY
			: null;
		let morphDuration
			= _.has(this, "state.Morph.Profile.Duration")
			? this.state.Morph.Profile.Duration
			: null;
		let morphEasing
			= _.has(this, "state.Morph.Profile.Easing")
			? this.state.Morph.Profile.Easing
			: "linear";
		let morphDelay
			= _.has(this, "state.Morph.Profile.Delay")
			? this.state.Morph.Profile.Delay
			: 0;
		let morphSpaces
			= _.has(this, "state.Morph.Profile.Spaces")
			? this.state.Morph.Profile.Spaces
			: true;
		let isSequential
			= _.has(this, "state.Morph.Profile.Sequential")
			? this.state.Morph.Profile.Sequential
			: true;
		let elementProfile
			= {};
		let elementCount
			= 0;
		let completeCount
			= 0;
		//
		let sampleProfiles =
			sampleChild.map(function(childElement)
			{
				let pathId
					= kinetictextId.concat("_child-path_", elementCount.toString(), "-svg");
				let elementId
					= kinetictextId.concat("_morph-element_", elementCount.toString(), "-container");
				let elementhostId
					= kinetictextId.concat("_morph-elementhost_", elementCount.toString(), "-container");
				let pathElement
					= document.getElementById(kinetictextId.concat("_child-path_", elementCount.toString(), "-svg"));
				let pathLength
					= (pathElement !== null)
					? pathElement.getTotalLength()
					: 0;
				let adjustedMorphEasing
					= (typeof morphEasing === "object")
					? morphEasing[elementCount]
					: morphEasing;
				let adjustedMorphDuration
					= (typeof morphDuration === "object")
					? morphDuration[elementCount]
					: (typeof morphDelay === "function")
					? morphDuration()
					: morphDuration;
				let adjustedMorphDelay
					= (typeof morphDelay === "object")
					? morphDelay[elementCount]
					: (typeof morphDelay === "function")
					? morphDelay()
					: morphDelay;
				//
				adjustedMorphDuration
				= (morphSpaces === false
				&& childElement === " ")
				? 0
				: adjustedMorphDuration;
				adjustedMorphDelay
				= (morphSpaces === false
				&& childElement === " ")
				? 0
				: adjustedMorphDelay;
				//
				if(isSequential === true)
				{
					if(elementCount === morphIndex)
					{
						elementProfile =
						{
							"duration":adjustedMorphDuration,
							"easing":adjustedMorphEasing,
							"runOnMount":true,
							"delay":adjustedMorphDelay,
							"animation":
							{
								"opacity":1
							},
							"progress":function(elements, complete, remaining, start, tweenValue)
							{
								let progressValue
									= elements[0].style.opacity;
								let progressLocation
									= parseFloat(progressValue) * parseFloat(pathLength);
								let pointElement
									= (pathElement !== null)
									? pathElement.getPointAtLength(progressLocation)
									: {};
								let locationX
									= (pointElement.x !== undefined)
									? (pointElement.x).toString().concat("px")
									: "0px";
								let locationY
									= (pointElement.y !== undefined)
									? (pointElement.y).toString().concat("px")
									: "0px";
								let translateZ
									= (childTranslateZ !== null)
									? (parseInt(childTranslateZ) * (1 - progressValue)).toString().concat("px")
									: null;
								let elementOpacity
									= (1 - parseFloat(childOpacity)) * progressValue
									+ parseFloat(childOpacity);
								let elementBlur
									= "blur(".concat(((parseFloat(childBlur)) * (1 - progressValue)).toString(), "px)");
								let elementRotation
									= ((1 - progressValue) * parseFloat(childRotation)).toString().concat("deg");
								let elementScaleX
									= (parseFloat(childScaleX > 1))
									? (parseFloat(childScaleX) - 1) * (1 - progressValue)
									+ 1
									: (1 - parseFloat(childScaleX)) * progressValue
									+ parseFloat(childScaleX);
								let elementScaleY
									= (parseFloat(childScaleY > 1))
									? (parseFloat(childScaleY) - 1) * (1 - progressValue)
									+ 1
									: (1 - parseFloat(childScaleY)) * progressValue
									+ parseFloat(childScaleY);
								let elementTransform
									= (childTranslateZ === null)
									? "scaleX(".concat(elementScaleX,
									") scaleY(", elementScaleY,
									") rotate(", elementRotation,
									")")
									: "translateZ(".concat(translateZ,
									") rotate(", elementRotation,
									")");
								let elementhostTransform
									= "translateX(".concat(locationX,") translateY(", locationY, ")");
								let morphElement
									= document.getElementById(elementId);
								let morphElementhost
									= document.getElementById(elementhostId);
								//
								Object.assign(morphElement.style,
								{
									"opacity":elementOpacity,
									"filter":elementBlur,
									"transform":elementTransform
								});
								Object.assign(morphElementhost.style,
								{
									"transform":elementhostTransform
								});
								scopeProxy.state.Morph.Change(
								{
									"Host":morphElementhost,
									"Child":childElement
								});
							},
							"complete":function(event)
							{
								let morphElementhost
									= document.getElementById(elementhostId);
								//
								scopeProxy.state.Morph.Complete(
								{
									"Host":morphElementhost,
									"Child":childElement
								});
								scopeProxy.morphSample();
							}
						}
					}
					else
					{
						elementProfile
						= {};
					}
				}
				else
				{
					elementProfile =
					{
						"duration":adjustedMorphDuration,
						"easing":adjustedMorphEasing,
						"runOnMount":true,
						"delay":adjustedMorphDelay,
						"animation":
						{
							"opacity":1
						},
						"progress":function(elements, complete, remaining, start, tweenValue)
						{
							let progressValue
								= elements[0].style.opacity;
							let progressLocation
								= parseFloat(progressValue) * parseFloat(pathLength);
							let pointElement
								= (pathElement !== null)
								? pathElement.getPointAtLength(progressLocation)
								: {};
							let locationX
								= (pointElement.x !== undefined)
								? (pointElement.x).toString().concat("px")
								: "0px";
							let locationY
								= (pointElement.y !== undefined)
								? (pointElement.y).toString().concat("px")
								: "0px";
							let translateZ
								= (childTranslateZ !== null)
								? (parseInt(childTranslateZ) * (1 - progressValue)).toString().concat("px")
								: null;
							let elementOpacity
								= (1 - parseFloat(childOpacity)) * progressValue
								+ parseFloat(childOpacity);
							let elementBlur
								= "blur(".concat(((parseFloat(childBlur)) * (1 - progressValue)).toString(), "px)");
							let elementRotation
								= ((1 - progressValue) * parseFloat(childRotation)).toString().concat("deg");
							let elementScaleX
								= (parseFloat(childScaleX > 1))
								? (parseFloat(childScaleX) - 1) * (1 - progressValue)
								+ 1
								: (1 - parseFloat(childScaleX)) * progressValue
								+ parseFloat(childScaleX);
							let elementScaleY
								= (parseFloat(childScaleY > 1))
								? (parseFloat(childScaleY) - 1) * (1 - progressValue)
								+ 1
								: (1 - parseFloat(childScaleY)) * progressValue
								+ parseFloat(childScaleY);
							let elementTransform
								= (childTranslateZ === null)
								? "scaleX(".concat(elementScaleX,
								") scaleY(", elementScaleY,
								") rotate(", elementRotation,
								")")
								: "translateZ(".concat(translateZ,
								") rotate(", elementRotation,
								")");
							let elementhostTransform
								= "translateX(".concat(locationX,") translateY(", locationY, ")");
							let morphElement
								= document.getElementById(elementId);
							let morphElementhost
								= document.getElementById(elementhostId);
							//
							Object.assign(morphElement.style,
							{
								"opacity":elementOpacity,
								"filter":elementBlur,
								"transform":elementTransform
							});
							Object.assign(morphElementhost.style,
							{
								"transform":elementhostTransform
							});
							scopeProxy.state.Morph.Change(
							{
								"Host":morphElementhost,
								"Child":childElement
							});
						},
						"complete":function(event)
						{
							let morphElementhost
								= document.getElementById(elementhostId);
							//
							scopeProxy.state.Morph.Complete(
							{
								"Host":morphElementhost,
								"Child":childElement
							});
							completeCount++;
							//
							if(completeCount === sampleLength)
							{
								let elementCount
									= 0;
								let elementhostId
									= kinetictextId.concat("_morph-elementhost_", elementCount.toString(), "-container");
								//
								morphElementhost
								= document.getElementById(elementhostId);
								//
								Object.assign(morphElementhost.style,
								{
									"transform":null
								});
								updateState(scopeProxy,
								{
									"Sample":
									{
										"Process":false
									}
								});
							}
						}
					}
				}
				elementCount++;
				//
				return elementProfile;
			});
		//
		if(morphIndex <= (sampleLength - 1))
		{
			morphIndex++;
			//
			updateState(scopeProxy,
			{
				"Morph":
				{
					"Index":morphIndex,
					"Profiles":sampleProfiles
				}
			});
		}
		else
		{
			let elementCount
				= 0;
			let elementhostId
				= kinetictextId.concat("_morph-elementhost_", elementCount.toString(), "-container");
			let morphElementhost
				= document.getElementById(elementhostId);
			//
			updateState(scopeProxy,
			{
				"Sample":
				{
					"Process":false
				}
			});
			Object.assign(morphElementhost.style,
			{
				"transform":null
			});
		}
	}
	resetProfiles()
	{
		let scopeProxy
			= this;
		let kinetictextId
			= this.props.id;
		let sampleChild
			= _.has(this, "state.Sample.Child")
			? this.state.Sample.Child.props.children.split("")
			: [];
		let sampleLength
			= sampleChild.length;
		let childelementCount
			= 0;
		//
		let sampleProfiles =
			sampleChild.map(function(childElement)
			{
				var elementProfile =
					{
						"duration":0,
						"easing":"easeOutQuad",
						"runOnMount":true,
						"delay":0,
						"animation":
						{
							"opacity":0
						},
						"progress":function(elements, complete, remaining, start, tweenValue)
						{
							// empty
						},
						"complete":function(event)
						{
							// empty
						}
					}
				//
				childelementCount++;
				//
				return elementProfile;
			});
		//
		updateState(scopeProxy,
		{
			"Morph":
			{
				"Index":0,
				"Profiles":sampleProfiles
			}
		});
		this.prepareSample();
	}
	stageSample()
	{
		let scopeProxy
			= this;
		let processSample
			= _.has(this, "state.Sample.Process")
			? this.state.Sample.Process
			: null;
		//
		if(processSample === false)
		{
			updateState(scopeProxy,
			{
				"Sample":
				{
					"Process":true
				}
			});
			watch(function()
			{
				let beginAnimate
					= scopeProxy.state.Sample.Process;
				//
				return beginAnimate;
			}).
			Match(true, function(event)
			{
				scopeProxy.prepareSample();
				scopeProxy.resetProfiles();
			});
		}
		else
		{
			scopeProxy.prepareSample();
		}
	}
	prepareSample()
	{
		let scopeProxy
			= this;
		let kinetictextId
			= this.props.id;
		let processSample
			= _.has(this, "state.Sample.Process")
			? this.state.Sample.Process
			: null;
		let sampleChild
			= _.has(this, "state.Sample.Child")
			? this.state.Sample.Child.props.children.split("")
			: [];
		let sampleLength
			= sampleChild.length;
		let childTranslateZ
			= _.has(this, "state.Sample.Style")
			? this.state.Sample.Style.TranslateZ
			: null;
		let childOpacity
			= _.has(this, "state.Sample.Style.Opacity")
			? this.state.Sample.Style.Opacity
			: null;
		let childBlur
			= _.has(this, "state.Sample.Style.Blur")
			? this.state.Sample.Style.Blur
			: null;
		let childRotation
			= _.has(this, "state.Sample.Style.Rotation")
			? this.state.Sample.Style.Rotation
			: null;
		let childScaleX
			= _.has(this, "state.Sample.Style.ScaleX")
			? this.state.Sample.Style.ScaleX
			: null;
		let childScaleY
			= _.has(this, "state.Sample.Style.ScaleY")
			? this.state.Sample.Style.ScaleY
			: null;
		let elementCount
			= 0;
		//
		let sampleProfiles =
			sampleChild.map(function(childElement)
			{
				let pathId
					= kinetictextId.concat("_child-path_", elementCount.toString(), "-svg");
				let elementId
					= kinetictextId.concat("_morph-element_", elementCount.toString(), "-container");
				let elementhostId
					= kinetictextId.concat("_morph-elementhost_", elementCount.toString(), "-container");
				let pathElement
					= document.getElementById(kinetictextId.concat("_child-path_", elementCount.toString(), "-svg"));
				let pathLength
					= (pathElement !== null)
					? pathElement.getTotalLength()
					: 0;
				let progressLocation
					= 0;
				let pointElement
					= (pathElement !== null)
					? pathElement.getPointAtLength(progressLocation)
					: {};
				let locationX
					= (pointElement.x !== undefined)
					? (pointElement.x).toString().concat("px")
					: "0px";
				let locationY
					= (pointElement.y !== undefined)
					? (pointElement.y).toString().concat("px")
					: "0px";
				let translateZ
					= (childTranslateZ !== null)
					? parseInt(childTranslateZ).toString().concat("px")
					: null;
				let elementOpacity
					= parseFloat(childOpacity);
				let elementBlur
					= "blur(".concat((parseFloat(childBlur)).toString(), "px)");
				let elementRotation
					= parseFloat(childRotation).toString().concat("deg");
				let elementScaleX
					= (parseFloat(childScaleX > 1))
					? (parseFloat(childScaleX) - 1)
					+ 1
					: parseFloat(childScaleX);
				let elementScaleY
					= (parseFloat(childScaleY > 1))
					? (parseFloat(childScaleY) - 1)
					+ 1
					: parseFloat(childScaleY);
				let elementTransform
					= (childTranslateZ === null)
					? "scaleX(".concat(elementScaleX,
					") scaleY(", elementScaleY,
					") rotate(", elementRotation,
					")")
					: "translateZ(".concat(translateZ,
					") rotate(", elementRotation,
					")");
				let elementhostTransform
					= "translateX(".concat(locationX,") translateY(", locationY, ")");
				let morphElement
					= document.getElementById(elementId);
				let morphElementhost
					= document.getElementById(elementhostId);
				//
				Object.assign(morphElement.style,
				{
					"opacity":elementOpacity,
					"filter":elementBlur,
					"transform":elementTransform
				});
				Object.assign(morphElementhost.style,
				{
					"transform":elementhostTransform
				});
				elementCount++;
			});
		//
	}
	//*************************
	//*************************
	// Assignments
	//
	static contextTypes =
		{
			// empty
		}
	//
}