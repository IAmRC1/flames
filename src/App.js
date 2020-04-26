import React, { Component } from 'react'
import love from './assets/images/love.png'
import enemy from './assets/images/enemy.png'
import friend from './assets/images/friends.png'
import sister from './assets/images/sister.png'
import marriage from './assets/images/marriage.png'
import affection from './assets/images/affection.png'

export default class App extends Component {
  state = {
    boy: "",
    girl: "",
    result: "",
    progress: 0,
    bar: false 
  }
  handleBoyChange = (e) => {this.setState({ boy: e.target.value, bar: false, result: '', progress: 0 })}

  handleGirlChange = (e) => {this.setState({ girl: e.target.value, bar: false, result: '', progress: 0 })}

  reset = () => {
    this.setState({
      boy: "",
      girl: "",
      result: "",
      progress: 0,
      bar: false
    })
  }

  afterprogress = (event) => {
    event.preventDefault();
    this.setState({bar: true})
    var prog = setInterval(()=>{
      this.setState({progress: this.state.progress+1})
      if(this.state.progress === 100){
        clearInterval(prog)
        this.flames()
        this.setState({bar: false})
      }
    }, 15)
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

  colorClass = () => {
    let res = this.state.result;
    switch(res){
      case 'Sister': return 'is-warning';
      case 'Enemy': return 'is-dark';
      case 'Friend': return 'is-primary';
      case 'Marriage': return 'is-info';
      case 'Affection': return 'is-link';
      case 'Love': return 'is-danger';
      default: return '';
    }
  }

  render() {
    const { boy, girl, progress, result, bar } =this.state;
    const errorBoy = () => boy.length===0? '': (boy.length<3 ? 'is-danger' : 'is-success')
    const errorGirl = () => girl.length===0? '': (girl.length<3 ? 'is-danger' : 'is-success')
    return (
      <section className="section is-relative">
        <a href="https://bulma.io" className="madewith">
          <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24" />
        </a>
        <div className="columns is-mobile is-centered">
          <div className="column is-6">
            <div className="is-flex">
              <h1 className="title">
                flames game
              </h1>
              
            </div>
            <form onSubmit={this.afterprogress} className="title">
              <div className="field">
                <label className="label">Enter your first name</label>
                <div className="control">
                  <input 
                    className={`input ${errorBoy()}`} 
                    type="text" 
                    minLength={3}
                    maxLength={12}
                    required
                    placeholder="Eg: Ramesh" 
                    value={boy} 
                    onChange={this.handleBoyChange} />
                </div>
                <p className={`${boy.length===0? 'is-hidden': ((boy.length>0 && boy.length<3) ? 'help is-text-grey-light' : 'is-hidden')}`}>Name must be between 3-12 letters</p>
              </div>
              <div className="field">
                <label className="label">Enter your crush's first name</label>
                <div className="control">
                  <input 
                  className={`input ${errorGirl()}`} 
                  type="text"
                  minLength={3}
                  maxLength={12} 
                  required
                  placeholder="Eg: Sunita" 
                  value={girl} 
                  onChange={this.handleGirlChange} />
                </div>
                <p className={`${girl.length===0? 'is-hidden': ((girl.length>0 && girl.length<3) ? 'help is-text-grey-light' : 'is-hidden')}`}>Name must be between 3-12 letters</p>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link" onClick={this.afterprogress} disabled={(!boy || !girl) || (boy === girl) || (boy.length<3 || girl.length<3)}>Submit</button>
                </div>
                <div className="control">
                  <button className="button is-link is-light" onClick={this.reset} disabled={!boy || !girl}>Reset</button>
                </div>
              </div>
            </form>
            <div>
              {bar && <progress className="progress is-success is-small" value={progress} max="100"></progress>}
              {result && <section className={`hero is-bold ${this.colorClass()}`} style={{borderRadius: '0.25rem'}}>
                  <div className="hero-body">
                    <div className="container">
                      <h1 className="title has-text-centered">
                        {result}
                      </h1>
                    </div>
                  </div>
                </section>
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}
