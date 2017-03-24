## React Kinetictext Effect

Kinetictext is a React component that applies motion and styling to targeted text. Each character of the target has the ability to follow a unique motion path along a tween profile and supports randomization. Properties of the tween profile include duration, delay, and easing. Character styles morph from an initial state, i.e. modified state, to their final state, i.e. default state. Tweenable style properties include scale, blur, translateZ, and opacity. The end result is an easy way to add compelling visual effects and choreography to static HTML text. As an option, unique Duration, Delay, Easing and Path parameters can be applied to each character. Parameters for Duration and Delay support functions. The component provides callbacks for Ready, Change, and Complete.

### Features
  * Full React/Flux pattern
  * Callbacks for onReady, onChange, onComplete
  * Methods for animate and stage
  * Fluid layout
  * CSS Rich

### Learn more
See the demo at [http://www.uismithing.com/main/wares/kinetictext](http://www.uismithing.com/main/wares/kinetictext).

### Repository
[https://github.com/uismithing/react-kinetictext-effect](https://github.com/uismithing/react-kinetictext-effect)

### Install
`npm install react-kinetictext-effect -s`

### Deploy
`import Kinetictext from "react-kinetictext-effect"`
```html
<Kinetictext id="kinetictext-sample-container" ref="kinetictextsample" {...kinetictextSampleProfile}>
  <div id="sample-caption-container" className="sample-caption">
    sample
  </div>
</Kinetictext>
```