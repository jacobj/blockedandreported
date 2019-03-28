import React, { Component } from "react"
import styled, { keyframes, injectGlobal } from "styled-components"
import scrollIntoView from "scroll-into-view"

const importAll = r => {
  return r.keys().map(r)
}

injectGlobal`
  body {
    background: #DDDDDD
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 20px;
`

const Post = styled.div`
  background: white;
  max-width: 500px;
  width: 100%;
  border: solid 1px #333333;
  margin-bottom: 20px;
`

const Header = styled.div`
  font-family: input-sans, sans-serif;
  font-weight: 400;
  line-height: 0.9;
  font-size: 16px;
  border-bottom: solid 1px #333333;
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
  font-family: input-sans, sans-serif;
  font-weight: 700;
  font-style: normal;
  margin: 0 -2px;
  font-style: normal;
  font-size: 140px;
  @media (max-width: 768px) {
    font-size: 50px;
  }
`

const wave = keyframes`
  0% {
    transform: translateY(30px) scale(1.0);
  }
  100% {
    transform: translateY(-30px) scale(1.1);
  }
`

const HeadingSpan = styled.span`
  color: #0000ff;
  display: inline-block;
  animation-name: ${wave};
  animation-duration: 0.5s;
  animation-delay: -${props => props.index / 50}s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  text-shadow: 0 1px #0000ff, 1px 0 #0000ee, 1px 2px #0000dd, 2px 1px #0000cc,
    2px 3px #0000bb, 3px 2px #0000aa, 3px 4px #000099, 4px 3px #000088,
    4px 5px #000077, 5px 4px #000066, 5px 6px #000055, 6px 5px #000044,
    6px 7px #000033, 7px 6px #000022, 7px 8px #000011, 8px 7px #000000,
    8px 9px #000000, 9px 8px #000000, 9px 10px #000000;
`

const Button = styled.button`
  color: black;
  font-family: input-sans, sans-serif;
  font-weight: 400;
  font-size: 16px;
  background-color: #dddddd;
  border: solid 1px black;
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
  var input = this

  for (var i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1))
    var itemAtIndex = input[randomIndex]

    input[randomIndex] = input[i]
    input[i] = itemAtIndex
  }
  return input
}

const images = importAll(
  require.context("./images", false, /\.(png|jpe?g|svg|mp4)$/)
)

// Initial shuffle
images.shuffle()

const text1 = "Blocked &"
const text2 = "Reported"

class App extends Component {
  constructor() {
    super()
    this.state = { clicked: false }
  }

  componentDidMount = () => {
    document.addEventListener("keydown", (e) => {
      var keyCode = e.keyCode
      if (keyCode == 13 && !this.state.clicked) {
        this.onClick()
      }
    }, false)
  }

  onClick = () => {
    if (!this.state.clicked) {
      this.setState({ clicked: true })
      const posts = document.getElementsByClassName("post")
      for (let i = 0; i < posts.length; i++) {
        setTimeout(() => {
          scrollIntoView(posts[i])
        }, 15000 + i * 15000)
      }

      setTimeout(() => {
        document.documentElement.scrollTop = 0
        images.shuffle()
        this.setState({ clicked: false })
        this.onClick()
      }, 20000 + posts.length * 15000)
    }
  }

  render() {
    return (
      <Container>
        <PlayButton disabled={this.state.clicked} onClick={this.onClick}>
          Scroll
        </PlayButton>
        <HeadingContainer>
          <Heading>
            {text1.split("").map((t, i) => (
              <HeadingSpan index={i} key={i}>
                {t === " " ? "\u00A0" : t}
              </HeadingSpan>
            ))}
          </Heading>
          <Heading>
            {text2.split("").map((t, i) => (
              <HeadingSpan index={i} key={i}>
                {t === " " ? "\u00A0" : t}
              </HeadingSpan>
            ))}
          </Heading>
        </HeadingContainer>
        {images.map(i => (
          <Post className="post">
            <Header>@{i.replace(/^.*[\\\/]/, "").split(" - ")[0]}</Header>
            {i.substring(i.lastIndexOf(".") + 1) === "mp4" ? (
              <Video autoPlay loop muted>
                <source src={i} type="video/mp4" />
              </Video>
            ) : (
              <Image src={i} />
            )}
            {
              <Footer>
                <Button>Block</Button>
                <Button>Report</Button>
              </Footer>
            }
          </Post>
        ))}
      </Container>
    )
  }
}

export default App
