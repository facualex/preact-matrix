import { useState, useEffect } from 'react'
import { SliderPicker } from 'react-color';
import { Container, Grid, GridItem, Button, TextArea } from './style';
import cogoToast from 'cogo-toast'

const matrixLength = 64
const matrix = Array(matrixLength).fill().map((v,i)=>i);

function getMatrixInitialState() {
	const matrixInitialState = {}
	matrix.forEach(led => {
		matrixInitialState[led] = {
			state: 'active',
			backgroundColor: '#ffffff' ,
		}
	})
	matrixInitialState.encoding = getMatrixEncoding(matrixInitialState)

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

function getMatrixEncoding(matrixState) {
	// encode to json format
	const encodedJson = {}
	matrix.forEach(ledId => {
		encodedJson[ledId] = matrixState[ledId].backgroundColor
	})

	return encodedJson
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

	function handleColorChange(color) {
		return setState(prevState => ({ ...prevState, selectedColor: color.hex }))
	}

	function clearMatrix(matrixState) {
		const stateToChangeCopy = { ...state[matrixState] }
		matrix.forEach(ledId => {
			stateToChangeCopy[ledId].backgroundColor = "#ffffff"
		})
		const newMatrixEncoding = getMatrixEncoding(stateToChangeCopy)
		setState(prevState => ({ ...prevState, [matrixState]: { ...stateToChangeCopy, encoding: newMatrixEncoding } }))
	}

	function handleOnLedClick({ index, matrixState }) {
		const stateToChangeCopy = { ...state[matrixState] }

		if (stateToChangeCopy[index].backgroundColor !== selectedColor) {
			stateToChangeCopy[index] = {
				...stateToChangeCopy[index],
				backgroundColor: selectedColor,
			}
		} else {
				stateToChangeCopy[index] = {
				...stateToChangeCopy[index],
				backgroundColor: '#ffffff',
			}
		}

		const newMatrixEncoding = getMatrixEncoding(stateToChangeCopy)

		return setState(prevState => ({ ...prevState, [matrixState]: { ...stateToChangeCopy, encoding: newMatrixEncoding } }))
	}

	function paintEncoding() {

	}

	function copyEncoding() {
		return cogoToast.success('Encoding copied to clipboard!'); 
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
				<div style={{ display: 'flex', flexDirection: 'row'}}>
					<Button onClick={() => clearMatrix('matrixOneState')} >Clear</Button>
					<Button border="1px solid #2bbb68" color="#2bbb68" hoverBackgroundColor="#2bbb68" onClick={() => console.log('draw')} >Draw</Button>
					<Button border="1px solid #40a4bf" color="#40a4bf" hoverBackgroundColor="#40a4bf" onClick={() => copyEncoding()} >Copy</Button>
				</div>
				<TextArea rows="5" content={JSON.stringify(matrixOneState?.encoding)} />
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
				<div style={{ display: 'flex', flexDirection: 'row'}}>
					<Button onClick={() => clearMatrix('matrixTwoState')} >Clear</Button>
					<Button border="1px solid #2bbb68" color="#2bbb68" hoverBackgroundColor="#2bbb68" onClick={() => console.log('draw')} >Draw</Button>
					<Button border="1px solid #40a4bf" color="#40a4bf" hoverBackgroundColor="#40a4bf" onClick={() => copyEncoding()} >Copy</Button>
				</div>

				<TextArea rows="5" content={JSON.stringify(matrixTwoState?.encoding)} />
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
				<div style={{ display: 'flex', flexDirection: 'row'}}>
					<Button onClick={() => clearMatrix('matrixThreeState')} >Clear</Button>
					<Button border="1px solid #2bbb68" color="#2bbb68" hoverBackgroundColor="#2bbb68" onClick={() => console.log('draw')} >Draw</Button>
					<Button border="1px solid #40a4bf" color="#40a4bf" hoverBackgroundColor="#40a4bf" onClick={() => copyEncoding()} >Copy</Button>
				</div>

				<TextArea rows="5" content={JSON.stringify(matrixThreeState?.encoding)} />
			</div>
		</Container>
	)
}


export default Home