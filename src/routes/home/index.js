import { useState, useEffect } from 'react'
import { SliderPicker } from 'react-color';
import { Container, Grid, GridItem, Button } from './style';

const matrixLength = 64
const matrix = Array(matrixLength).fill().map((v,i)=>i);

function getMatrixInitialState({ selectedColor }) {
	const matrixInitialState = {}
	matrix.forEach(led => {
		matrixInitialState[led] = {
			state: 'active',
			backgroundColor: 'white' ,
		}
	})
	return  matrixInitialState
}

function getHeaderStyle(backgroundColor) {
	return {
		backgroundColor,
		width: "100%",
		height: "10rem",
		position: "absolute",
		top: 0,
		zIndex: 99,
		display: "flex",
		justifyContent: "center",
	}
}

const initialState = {
	selectedColor: "#2bb6bb",
	matrixOneState: null,
	matrixTwoState: null,
	matrixThreeState: null,
}

function Home() {
	const [state, setState] = useState(initialState)

	useEffect(() => {
		const matrixInitialState = getMatrixInitialState({ selectedColor: state.selectedColor })
		setState(prevState => ({
			...prevState,
			matrixOneState: matrixInitialState,
			matrixTwoState: matrixInitialState,
			matrixThreeState: matrixInitialState,
		}))
	}, [])


	const { selectedColor, matrixOneState, matrixTwoState, matrixThreeState } = state

	function handleColorChange(selectedColor) {
		setState(prevState => ({ ...prevState, selectedColor: selectedColor.hex }))
	}

	function clearMatrix(matrixState) {
		const stateToChangeCopy = { ...state[matrixState] }
		matrix.forEach(ledId => {
			stateToChangeCopy[ledId].backgroundColor = "white"
		})
		setState(prevState => ({ ...prevState, [matrixState]: stateToChangeCopy }))
	}

	function handleOnLedClick({ index, matrixState }) {
		const stateToChangeCopy = { ...state[matrixState] }
		stateToChangeCopy[index] = {
			...stateToChangeCopy[index],
			backgroundColor: selectedColor,
		}

		setState(prevState => ({ ...prevState, [matrixState]: stateToChangeCopy }))
	}

	return (
		<Container>
			<div style={getHeaderStyle(selectedColor)}>
				<div style={{ width: "50%", height:"5rem", padding: "1rem 2rem", borderRadius: "3px", marginTop: "2rem", backgroundColor: "white"}}>
					<SliderPicker color={selectedColor} onChange={handleColorChange} />
				</div>
			</div> 

			<div style={{ display: "flex", flexDirection: "column", justifyContent: 'center' }}>
				<Grid>
					{matrixOneState && matrix.map(index => {
						return (
							<GridItem
								backgroundColor={matrixOneState[index].backgroundColor}
								key={index}
								onClick={() => handleOnLedClick({ index, matrixState: 'matrixOneState'})}
							/>
						)
					})}
				</Grid>
				<Button onClick={() => clearMatrix('matrixOneState')} >Clear</Button>
			</div>

			<div style={{ display: "flex", flexDirection: "column", justifyContent: 'center' }}>
				<Grid>
				{matrixTwoState && matrix.map(index => {
					return (
						<GridItem 
							backgroundColor={matrixTwoState[index].backgroundColor} 
							key={index}
							onClick={() => handleOnLedClick({ index, matrixState: 'matrixTwoState'})}
						/>
					)
				})}
				</Grid>
				<Button onClick={() => clearMatrix('matrixTwoState')} >Clear</Button>
			</div>

			<div style={{ display: "flex", flexDirection: "column", justifyContent: 'center' }}>
				<Grid>
					{matrixThreeState && matrix.map(index => {
						return (
							<GridItem
								backgroundColor={matrixThreeState[index].backgroundColor} 
								key={index}
								onClick={() => handleOnLedClick({ index, matrixState: 'matrixThreeState'})}
							/>
						)
					})}
				</Grid>
				<Button onClick={() => clearMatrix('matrixThreeState')} >Clear</Button>
			</div>
		</Container>
	)
}


export default Home