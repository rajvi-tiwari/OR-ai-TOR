import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text} from 'react-native';
import { Container, Header, Content, Button, Icon, Card, CardItem, Body, Left, Right, Title } from 'native-base';
import { PieChart, AreaChart, BarChart, Grid } from 'react-native-svg-charts';
import { Text as TextChart } from 'react-native-svg'
import { recordings } from "./Variables.js";
import * as shape from 'd3-shape'

export default class Feedback extends Component {
  render() {
    
    const currentSpeech = recordings[Object.keys(recordings)[Object.keys(recordings).length - 1]];
    const fill = 'rgb(134, 65, 244)'
    const barData   = [ 50, 10, 40, 95, 4, 12, 85, 20, 35, 53 ]
    const areaData = [ 20, 10, 15, -15, -4, -14, 10, 21, 25, 0, -23, 24, 10, -20, -10 ]
    const pieData = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

    const pie = pieData
        .filter(value => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))

    const CUT_OFF = 20
    const Labels = ({ x, y, bandwidth, data }) => (
        data.map((value, index) => (
            <TextChart
                key={ index }
                x={ x(index) + (bandwidth / 2) }
                y={ value < CUT_OFF ? y(value) - 10 : y(value) + 15 }
                fontSize={ 14 }
                fill={ value >= CUT_OFF ? 'white' : 'black' }
                alignmentBaseline={ 'middle' }
                textAnchor={ 'middle' }
            >
                {value}
            </TextChart>
        ))
    )


    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('HomePage')}>
              <Icon name='ios-home'/>
            </Button>
          </Left>
          <Body>
            <Title>Statistics</Title>
          </Body>
        </Header>
        <Content >
          <Card>
            <CardItem>
              <Left>
                <Icon active name='stats' />
                <Body>
                  <Text>Frequency of your top 10 stop-words</Text>
                  <Text note>Score: 5</Text>
                </Body>
              </Left>
            </CardItem>
            <View>
              <BarChart
                style={{ height: 200, flex: 1 }}
                data={ barData }
                svg={{ fill }}
                contentInset={{ top: 60, bottom: 0 }}
                spacing={0.2}
                gridMin={0}
              >
                <Grid direction={Grid.Direction.HORIZONTAL}/>
                <Labels/>
              </BarChart>
              <Text>
              </Text>
            </View>
          </Card>

          <Card>
            <CardItem>
              <Left>
                <Icon active name='musical-note' />
                <Body>
                  <Text>Pitch Intonation</Text>
                  <Text note>Score: 3</Text>
                </Body>
              </Left>
            </CardItem>
            <View>
              <AreaChart
                style={{ height: 200 }}
                data={ areaData }
                contentInset={{ top: 30, bottom: 30 }}
                curve={ shape.curveNatural }
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                gridMax={ 100 }
                gridMin={ -100 }
              >
                <Grid/>
              </AreaChart>
              <Text>
              </Text>
            </View>
          </Card>

          <Card>
            <CardItem>
              <Left>
                <Icon active name='pie' />
                <Body>
                  <Text>Comparison of your top 10 stop-words</Text>
                </Body>
              </Left>
            </CardItem>
            <View>
              <PieChart
                style={ { height: 200 } }
                data={ pie }
              />
              <Text>
              </Text>
            </View>
          </Card>

        </Content>
      </Container>
    );
  }
}
