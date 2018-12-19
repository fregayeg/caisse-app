import React, {PropTypes} from 'react';

class TasksPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      tasks: [],
      task: {
        title: '',
        price: 0
      },
      total: 0,
      clientPush: 0,
      result: null,
      caisse: 1000
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const task = this.state.task;
    if (e.target.name == 'lib')
      this.setState({task: {title: e.target.value}}, () => {
        console.log(' title ', this.state.task.title);
      });
    if (e.target.name == 'price')
      this.setState({task: {price: parseInt(e.target.value)}}, () => {
        console.log(' price ', this.state.task.price);
      });
    if (e.target.name == 'client') {
      this.setState({clientPush: parseInt(e.target.value)}, (() => {
        console.log('client : ', this.state.clientPush);
      }));
    }
  }

  handleClick(e) {
    if (e.target.name == 'add') {
      if (this.state.task.title !== '' && this.state.task.price > 0) {
        this.setState({
          tasks: [...this.state.tasks, Object.assign({},this.state.task)],
          total: this.state.total + this.state.task.price,
          caisse: this.state.caisse + this.state.task.price
        }, () => {
          console.warn('task :', this.state.tasks);
        });
      }
    }
    if (e.target.name == 'calcul') {
      if (this.state.total && this.state.clientPush && this.state.total == this.state.clientPush) {
        this.setState({result: 'Pas de reste! Merci pour votre visite'})
      }
      if (this.state.total && this.state.clientPush && this.state.total < this.state.clientPush) {
        const total = this.state.total;
        const clientPush = this.state.clientPush;
        let rest = clientPush - total;
        let numberOfTens = 0;
        let numberOfFives = 0;
        let numberOfTwos = 0;

        if (rest >= 10) {
          if (!rest % 10 == 0) {
            numberOfTens = Math.floor(rest / 10);
            rest -= numberOfTens * 10;
          }
          else {
            numberOfFives = Math.floor(rest / 5);
            rest -= numberOfFives * 5;
          }
        }
        if (rest >= 5) {
          if (!rest % 5 == 0) {
            numberOfFives = Math.floor(rest / 5);
            rest -= numberOfFives * 5;
          }
          else {
            numberOfTwos = Math.floor(rest / 2);
            rest -= numberOfTwos * 2;
          }
        }
        if (rest >= 2) {
          numberOfTwos = Math.floor(rest / 2);
          rest -= numberOfTwos * 2;
        }

        console.log('rest :', rest);
        console.log('number of tens :', numberOfTens);
        console.log('number of fives :', numberOfFives);
        console.log('number of twos :', numberOfTwos);

        this.setState({
          result: 'vous rendrez à votre client : \n'
          + (numberOfTens > 0 ? numberOfTens + ' billet' + (!numberOfTens > 1 ? '' : 's') + ' de 10 dinars \n' : '')
          + (numberOfFives > 0 ? numberOfFives + ' billets de 5 dinars \n' : '')
          + (numberOfTwos > 0 ? numberOfTwos + ' billets de 2 dinars \n' : '')
        , caisse: this.state.caisse - total});
      }
      if (this.state.clientPush < this.state.total) {
        this.setState({result: <h3 style={{color: 'red'}}>l'argent n'est pas suffisant</h3>})
      }
    }

    if (e.target.name == 'refresh') {
      this.setState({
        total: 0,
        result: null,
        clientPush: 0
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Bienvenu {this.props.lastName}</h1>
        <div>
        <h2>Montant de la caisse:<span style={{color:'green'}}>{this.state.caisse} Dinars</span></h2>

        </div>
        <h1>Liste des achats</h1>
        {this.state.tasks.map((task, index) => {
          return (
            <div key={index}> objet N°{index+1} : {task.price} dinars</div>
          );
        })}
        <div>
          Libellé : <input
          type="text"
          name="lib"
          onChange={this.handleChange}
          defaultValue=""/> {' '}
          Prix en dinars : <input
          type="number"
          name="price"
          onChange={this.handleChange}
          defaultValue={0}/>
          <button
            type="button"
            name="add"
            onClick={this.handleClick}>Ajouter
          </button>

          <h1>Total : {this.state.total} Dinars </h1>
        </div>
        <div style={{paddingTop: '10%'}}>
          <h1>Montant entré par le client</h1>
          <input name="client" type="number" onChange={this.handleChange}/>
        </div>
        <div style={{paddingTop: '1%'}} className="col-sm-1">
          <button name="calcul" onClick={this.handleClick}>Calculer</button>
        </div>
        <div style={{paddingTop: '1%'}}>
          <button name="refresh" onClick={this.handleClick}>Refraichir</button>
        </div>
        <div style={{paddingTop: '5%'}}>{this.state.result}</div>
      </div>
    );
  }
}


TasksPage.propTypes = {
  lastName: PropTypes.string.isRequired
};

export default TasksPage;
