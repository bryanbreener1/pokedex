import React, {useState, useEffect} from 'react'
import './styles/Progressbar.css'

const ProgressBar = ({value, name}) => {
	const [filled, setFilled] = useState(0);
	useEffect(() => {
		if (filled < value ) {
			setTimeout(() => setFilled(prev => prev += 4), 50)
		}
	},[filled])
  return (
	  <div className='progressbar__container'>
		<div className='progressbar__values'>
		  <span>{name}</span><span className="progressPercent">{ filled }/150</span>	
		</div>
		  <div className="progressbar">
			  <div style={{
				  height: "100%",
				  width: `${filled-30}%`,
				  backgroundColor: "rgb(141, 100, 23)",
				  transition:"width 0.5s"
			  }}></div>
		  </div>
		  
	</div>
  )
}

export default ProgressBar