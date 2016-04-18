// One time theme setup (put this in an initialization file and call it once)
import Frig from 'frig'
import FriggingBootstrap from 'frigging-bootstrap'
Frig.defaultTheme(FriggingBootstrap)
// Libraries needed for each component
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Input, Submit } from 'frig'

class TheBasicsExample extends React.Component {
  displayName = 'TheBasicsExample'
  state = { account: {} }

  render() {
    return (
      <Form
        data={this.state.account}
        onChange={(account) => this.setState({ account })}
      >
        <div className="row">
          <Input name="email" />
          <Input name="password" />
          <Input name="rememberMe" type="switch" />
          <Submit title="Sign In" />
        </div>
      </Form>
    )
  }
}

window.addEventListener('load', () => {
  const el = document.getElementById('the-basics-example')
  ReactDOM.render(<TheBasicsExample />, el)
})
