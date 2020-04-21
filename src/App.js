import React, { Component } from 'react'

export default class App extends Component {
  state = {
    boy: "",
    girl: "",
    result: "",
    err: false,
    progress: 0
  }
  handleBoyChange = (e) => {
    this.setState({
      boy: e.target.value
    })
  }

  handleGirlChange = (e) => {
    this.setState({
      girl: e.target.value
    })
  }

  reset = () => {
    this.setState({
      boy: "",
      girl: "",
      result: ""
    })
  }

  flames = () => {
    const boy = this.state.boy.toLowerCase().split('')
    const girl = this.state.girl.toLowerCase().split('')
    for (let i=0; i<boy.length; i++){
      for(let j=0; j<girl.length; j++){
          if(boy[i] === girl[j]){
            boy.splice(i, 1, null)
            girl.splice(j, 1, null)
          }
      }
    }
    let counter = boy.concat(girl).filter(Boolean).length;
    if(counter === 1){this.setState({result: 'Sister'})}
    else if(counter === 2 || counter === 4 || counter === 7 || counter === 9 || counter === 20){
      this.setState({result: 'Enemy'})}
    else if(counter === 3 || counter === 5 || counter === 14 || counter === 16 || counter === 18){
      this.setState({result: 'Friend'})}
    else if(counter === 6 || counter === 11 || counter === 15){this.setState({result: 'Marriage'})}
    else if(counter === 8 || counter === 12 || counter === 13 || counter === 17){this.setState({result: 'Affection'})}
    else if(counter === 10 || counter === 19 ){this.setState({result: 'Love'})}
    
  }
  

  

  render() {
    const errorBoy = () => this.state.boy.length===0? '': (this.state.boy.length<3 ? 'is-danger' : 'is-success')
    const errorGirl = () => this.state.girl.length===0? '': (this.state.girl.length<3 ? 'is-danger' : 'is-success')
    return (
      <section className="section">
        <div className="columns is-mobile is-centered">
          <div className="column is-4">
            <h1 className="title">
              flames game
            </h1>
            <div className="field">
              <label className="label">Enter your name</label>
              <div className="control">
                <input 
                  className={`input ${errorBoy()}`} 
                  type="text" 
                  minLength={3}
                  maxLength={12}
                  required
                  placeholder="Eg: Ramesh" 
                  value={this.state.boy} 
                  onChange={this.handleBoyChange} />
              </div>
              {this.state.err && <p className="help is-success">Looks perfect</p>}
            </div>
            <div className="field">
              <label className="label">Enter your crush's name</label>
              <div className="control">
                <input 
                className={`input ${errorGirl()}`} 
                type="text"
                minLength={3}
                maxLength={12} 
                required
                placeholder="Eg: Sunita" 
                value={this.state.girl} 
                onChange={this.handleGirlChange} />
              </div>
              {this.state.err && <p className="help is-danger">This name is invalid</p>}
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" onClick={this.flames} disabled={!this.state.boy || !this.state.girl}>Enter</button>
              </div>
              <div className="control">
                <button className="button is-link is-light" onClick={this.reset}>Reset</button>
              </div>
            </div>
            <div>
            <progress className="progress is-success" value={this.state.progress} max="100"></progress>
            <p>{this.state.result}</p>
            </div>
            {/* <a href="https://bulma.io">
              <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24" />
            </a> */}
          </div>
        </div>
      </section>
    )
  }
}
