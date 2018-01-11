import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
const BlockedAndReported = require('./blocked\ and\ reported.png')

const importAll = (r) => {
  return r.keys().map(r);
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 20px;
`

const Post = styled.div`
  max-width: 500px;
  width: 100%;
  border: solid 1px #dcdcdc;
  margin-bottom: 20px;
  border-radius: 3px;
`

const Header = styled.div`
  font-family: courier;
  font-weight: bold;
  font-size: 16px;
  border-bottom: solid 1px #dcdcdc;
  padding: 15px;
  background: white;
`

const Footer = styled.div`
  padding: 15px;
  background: white;
`

const Image = styled.img`
  width: 100%;
  height: auto;
  background: white;
`

const Video = styled.video`
  width: 100%;
  height: auto;
  background: white;
`

const HeadingContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Heading = styled.div`
  font-family: "cooper-black-std";
  font-size: 120px;
  @media(max-width: 768px) {
    font-size: 50px;
  }
`

const wave = keyframes`
  0% {
    transform: translateY(90px); 
  }
  100% {
    transform: translateY(-90px);
  }
`

const HeadingSpan = styled.span`
  color: red;
  display: inline-block;
  animation-name: ${wave};
  animation-duration: 0.5s;
  animation-delay: ${props => props.index / 50}s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  text-shadow:
  0 1px #900000,
  1px 0 #880000,
  1px 2px #800000,
  2px 1px #780000,
  2px 3px #700000,
  3px 2px #680000,
  3px 4px #600000,
  4px 3px #580000,
  4px 5px #500000,
  5px 4px #480000,
  5px 6px #400000,
  6px 5px #380000,
  6px 7px #300000,
  7px 6px #280000,
  7px 8px #200000,
  8px 7px #180000,
  8px 9px #100000,
  9px 8px #080000,
  9px 10px #000000;
`

const Button = styled.button`
  font-family: courier;
  font-weight: bold;
  font-size: 16px;
  background-color: #dcdcdc;
  border: solid 1px #dcdcdc;
  border-radius: 3px;
  margin-right: 8px;
  padding: 8px 16px;
  outline: none;
  cursor: pointer;
`

const PlayButton = Button.extend`
  align-self: flex-start;
  margin-top: 20px;
  opacity: 0.5;
  margin-bottom: -20px;
  ${props => props.disabled && `opacity: 0;`}
`

Array.prototype.shuffle = function() {
  var input = this;
   
  for (var i = input.length-1; i >=0; i--) {
   
      var randomIndex = Math.floor(Math.random()*(i+1)); 
      var itemAtIndex = input[randomIndex]; 
       
      input[randomIndex] = input[i]; 
      input[i] = itemAtIndex;
  }
  return input;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg|mp4)$/))

images.shuffle()

const text1 = "Blocked &"
const text2 = "Reported"

class App extends Component {
  constructor() {
    super()
    this.state = {clicked: false}
  }

  onClick = () => {
    if (!this.state.clicked) {
      this.setState({clicked: true})
      const images = document.getElementsByClassName('post')
      for (let i = 0; i < images.length; i++) {
        setTimeout(() => {
          images[i].scrollIntoView({behavior: 'smooth', block: 'center'})
        }, 15000 + (i * 15000))
      }

      setTimeout(() => {
        document.documentElement.scrollTop = 0
        images.shuffle()
        this.setState({clicked: true})
        this.onClick() 
      }, 15000 + (images.length * 15000))      
    }
  }

  render() {
    return (
      <Container>
        <PlayButton disabled={this.state.clicked} onClick={this.onClick}>Play</PlayButton>
        <HeadingContainer>
          <Heading>
            {text1.split("").map((t, i) => <HeadingSpan index={i} key={i}>{t === " " ? '\u00A0' : t}</HeadingSpan>)}
          </Heading>
          <Heading>
            {text2.split("").map((t, i) => <HeadingSpan index={i} key={i}>{t === " " ? '\u00A0' : t}</HeadingSpan>)}
          </Heading>

        </HeadingContainer>
        {images.map(i => 
          <Post className="post">
            <Header>@{i.replace(/^.*[\\\/]/, '').split(' - ')[0]}</Header>
            {i.split('.')[2] === "mp4" ? 
            <Video autoPlay loop muted>
              <source src={i} type="video/mp4" />
            </Video> : <Image src={i} />}
            <Footer><Button>BLOCK</Button><Button>REPORT</Button></Footer>
          </Post>
        )}
      </Container>
    )
  }
}

export default App;
