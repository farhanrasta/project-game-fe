import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const GameScreen = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const animatedValue = new Animated.Value(0);
  const animatedValueComputer = new Animated.Value(0);

  const animateChoices = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * 3);
      const choices = ['Scissors', 'Rock', 'Paper'];
      setComputerChoice(choices[randomNum]);
      Animated.timing(animatedValueComputer, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        calculateResult();
      }, 1000);
    }, 1000);
  };

  const calculateResult = () => {
    if (userChoice === computerChoice) {
      setResult('Draw');
    } else if (
      (userChoice === 'Rock' && computerChoice === 'Scissors') ||
      (userChoice === 'Paper' && computerChoice === 'Rock') ||
      (userChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
      setResult('You Win');
    } else {
      setResult('Computer Wins');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rock Paper Scissors</Text>
      <View style={styles.choicesContainer}>
        <Animated.View
          style={[
            styles.choice,
            {
              transform: [
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [200, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.choiceText}>{userChoice}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.choice,
            {
              transform: [
                {
                  translateY: animatedValueComputer.interpolate({
                    inputRange: [0, 1],
                    outputRange: [200, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.choiceText}>{computerChoice}</Text>
        </Animated.View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setUserChoice('Rock');
            animateChoices();
          }}
        >
          <Text style={styles.buttonText}>Rock</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setUserChoice('Paper');
            animateChoices();
          }}
        >
          <Text style={styles.buttonText}>Paper</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setUserChoice('Scissors');
            animateChoices();
          }}
        >
          <Text style={styles.buttonText}>Scissors</Text>
        </TouchableOpacity>
      </View>
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  choicesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  choice: {
    marginHorizontal: 10,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  choiceText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default GameScreen;
