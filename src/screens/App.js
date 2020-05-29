import React from 'react'
import styled from 'styled-components'

const NavBar = styled.div`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  color: white;
  background-color: black;
`

const NavBarContent = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: 0;
  max-width: 1200px;
  min-width: 0;
  margin: 0 auto;
  padding: 16px 8px;
`

const Link = styled.a`
  box-sizing: border-box;
  color: #ffffff;
  display: inline-block;
  font-size: ${({ size }) => size || '14'}px;
  font-weight: 600;
  margin: 0;
  padding: 0;
  text-decoration: none;
`

const Content = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1200px;
  min-width: 0;
  padding: 8px;
`

const App = () => {
  return (
    <>
      <NavBar>
        <NavBarContent>
          <Link size='16' href='https://samuelreichert.github.io' target='_blank'>
            Samuel Reichert
          </Link>

          <Link href='https://saltoks.com/team' target='_blank'>
            SaltoKS
          </Link>
        </NavBarContent>
      </NavBar>

      <Content>
        Content
      </Content>
    </>
  );
}

export default App;
