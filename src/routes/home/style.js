import styled from 'styled-components'

const Container = styled('div')`
	width:100%;
	position: relative;
	z-index: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Grid = styled('div')`
	margin-top: 11rem;
	margin-right: 1rem;
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: repeat(8, 1fr);
	justify-items: center;
	width: 35rem;
	height: 35rem;
	background-color: #b5beba;
`

const Button = styled('button')`
	padding: 1rem 2rem;
    background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : 'white'};
	color: ${({ color }) => color ? color : '#2bb6bb'};
	border: ${({ border }) => border ? border : '1px solid #2bb6bb'};
	margin: 1rem 0;
	width: 100%;
	cursor: pointer;
	transition: 0.3s all;
	-webkit-box-shadow: 0px 4px 24px 1px rgba(0,0,0,0.32);
	-moz-box-shadow: 0px 4px 24px 1px rgba(0,0,0,0.32);
    box-shadow: 0px 3px 10px 3px rgba(0,0,0,0.15);
    
    &:hover {
		background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor ? hoverBackgroundColor : '#2bb6bb'};
		color: ${({ hoverColor }) => hoverColor ? hoverColor : '#fff'};
    }
`

const GridItem = styled('div')`
	width: 4rem;
	height: 4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #6e6e6e;
	transition: 0.3s all;
    cursor: pointer;
    background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : 'white'};

    &:hover {
	    transform: scale(1.1);
	    z-index: 99;
    }
`

const TextArea = styled('textarea')`
	background-color: #e0e0e0;
	outline: none;
	border: 1px solid #6e6e6e;
	resize: none;
`

function GridWrapper({ children, ...props }) {
    return (
        <Grid {...props}>
            {children}
        </Grid>
    )
}

function GridItemWrapper({ children, ...props }) {
    return (
        <GridItem {...props}>
            {children}
        </GridItem>
    )
}

function ContainerWrapper({ children, ...props }) {
    return (
        <Container {...props} >
            {children}
        </Container>
    )
}

function ButtonWrapper({ children, ...props }) {
    return (
        <Button {...props} >
            {children}
        </Button>
    )
}

function TextAreaWrapper({ content, ...props}) {
	return (
		<TextArea {...props}>
			{ content }
		</TextArea>
	)
}



export {
    GridWrapper as Grid,
    GridItemWrapper as GridItem,
    ContainerWrapper as Container,
	ButtonWrapper as Button,
	TextAreaWrapper as TextArea,
}