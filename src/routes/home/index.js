import { useState } from 'react'
import { SliderPicker } from 'react-color';
import style from './style';
const matrixLength = 64
const matrix = Array(matrixLength).fill().map((v,i)=>i);

function getHeaderStyle(backgroundColor) {
	return {
	backgroundColor,
	width: "100%",
	height: "10rem",
	position: "absolute",
	top: 0,
	zIndex: -1,
	display: "flex",
	justifyContent: "center",

	}
}

const initialState = {
	selectedColor: "#bfdbcf",
}

function Home() {
	const [state, setState] = useState(initialState)
	const { selectedColor } = state

	function handleColorChange(selectedColor) {
		setState({ selectedColor: selectedColor.hex })
	}

	return (
		<div class={style.container}>
			<div style={getHeaderStyle(selectedColor)}>
				<div style={{ width: "50%", height:"5rem", padding: "1rem 2rem", borderRadius: "3px", marginTop: "2rem", backgroundColor: "white"}}>
					<SliderPicker color={selectedColor} onChange={handleColorChange} />
				</div>
			</div> 
			<div class={style.grid}>
				{matrix.map(index => {
					return (
						<div class={style.gridItem} key={index}>
						</div>
					)
				})}
			</div>
<div class={style.grid}>
				{matrix.map(index => {
					return (
						<div class={style.gridItem} key={index}>
						</div>
					)
				})}
			</div>
<div class={style.grid}>
				{matrix.map(index => {
					return (
						<div class={style.gridItem} key={index}>
						</div>
					)
				})}
			</div>

		</div>
	)
}


export default Home