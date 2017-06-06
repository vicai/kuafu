import React from 'react';

import PlayCounter from './PlayCounter';
import styles from './ExampleApp.scss';

export default class ExampleApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {duration: 30};

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({ duration: e.target.value });
  }

  render() {
    const { duration } = this.state;

    return (
      <div
        className={styles.exampleApp}
      >
        <div className={styles.label}>
          <label>
            Song duration in seconds: 30
            {/*<input*/}
                {/*name="songLength"*/}
                {/*type="number"*/}
                {/*value={this.state.duration}*/}
                {/*onChange={this.handleInputChange} />*/}
          </label>
        </div>
        <PlayCounter
          className={styles.playerCounter}
          duration={duration}
        />
      </div>
    )
  }
}
