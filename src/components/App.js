/********************Imports*************************/

import React, {PropTypes} from 'react';

/********************Components*************************/

class App extends React.Component {
  render() {
    const style = {
      paddingTop:'10%'
    };
    return (
      <div style={style} className="container">
        <div className="core">
          {this.props.children}
        </div>
      </div>
    );
  }
}

/********************propTypes*************************/

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
