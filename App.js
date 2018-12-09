import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PureChart from 'react-native-pure-chart';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {open:false}
    this.socket = new WebSocket('wss://www.bitmex.com/realtime?subscribe=instrument,orderBookL2_25:XBTUSD')

  }

  componentDidMount() {
    this.socket.onopen = () => {
      console.log('Connected')
    }

    this.socket.onmessage = ({data}) => {
      console.log(JSON.parse(data));
    }
  }

  renderChart(){
    let sampleData = [
      {
        seriesName: 'series1',
        data: [
          { x: '2018-02-01', y: 30 },
          { x: '2018-02-02', y: 200 },
          { x: '2018-02-03', y: 170 },
          { x: '2018-02-04', y: 250 },
          { x: '2018-02-05', y: 10 }
        ],
        color: '#297AB1'
      },
      {
        seriesName: 'series2',
        data: [
          { x: '2018-02-01', y: 20 },
          { x: '2018-02-02', y: 100 },
          { x: '2018-02-03', y: 140 },
          { x: '2018-02-04', y: 550 },
          { x: '2018-02-05', y: 40 }
        ],
        color: 'yellow'
      }
    ]
    return (
      < PureChart data = { sampleData } type = 'line' />
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
        { this.renderChart() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
