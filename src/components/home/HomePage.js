/********************Imports*************************/
import React from 'react';

import TasksPage from "../task/TasksPage";

/********************Components*************************/

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      enter: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleChange(e) {
    //debugger;
    const eventName = e.target.name;
    let targetValue = e.target.value;

    // capitalize first letter
    targetValue =  targetValue.charAt(0).toUpperCase() + targetValue.slice(1);

    //console.log(eventName);
    if (eventName === 'firstName')
      this.setState({firstName: targetValue}, () => {

        console.log('firstname state = ', this.state.firstName);
      });
    if (eventName === 'lastName')
      this.setState({lastName: targetValue}, () => {
        //console.log('firstname state = ', this.state.firstName);
      });
  }

  handleClick() {
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
      if (firstName !== '' && lastName !== '') {
          setTimeout(() => {
            window.alert('bonjour');
            this.setState({enter:true});
          }, 2000);
      }
      else
        window.alert('Veuillez saisir votre nom et prenom');
  }

  render() {
      if(!this.state.enter) {
        return (
          <div className="jumbotron">
            <p>Veuillez remplir les champs et validez ensuite en cliquant sur le bouton "Ok"</p>
            {/* link to "about" page*/}
            <div>
              <div className="col-sm-3">
                Nom : <input name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange}/>
              </div>
              <div className="col-sm-4">
                Prénom : <input name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange}/>
              </div>
                <button type="button" onClick={this.handleClick}>Ok</button>
            </div>
          </div>
        );
      }else return <TasksPage lastName={this.state.lastName}/>;
  }
}

export default HomePage;
