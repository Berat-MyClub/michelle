import styled from "styled-components";

const Container =  styled.div`
    width: 20rem;
    height: 10rem;
    background-color: #b3b3b3;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    margin: 1rem 0;
    border-radius: 15px;
    background-image: url(${props => props.url && props.url});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
`

export default function ImageUplaod({url}) {
    return(
        <Container url={url}></Container>
    )
}