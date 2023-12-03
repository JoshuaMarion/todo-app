import React from 'react';

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: {
        // Your POST request payload goes here
        id: 'value1',
        key2: 'value2',
      },
      responseData: null,
    };
    this.handlePostRequest = this.handlePostRequest.bind(this);
  }

  async handlePostRequest() {
    try {
      const response = await fetch('http://localhost:5000/task/1234321', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.postData),
      });

      const data = await response.json();
      this.setState({ responseData: data });
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handlePostRequest}>Make POST Request</button>
        {this.state.responseData && (
          <div>
            <h2>API Response:</h2>
            <pre>{JSON.stringify(this.state.responseData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}

export default TestComponent;
