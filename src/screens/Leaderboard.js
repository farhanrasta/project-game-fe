import React from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import goldmedal from '../assets/goldmedal.png'
import silvermedal from '../assets/silvermedal.png'
import bronzemedal from '../assets/bronzemedal.png'
import gb1 from '../assets/gb1.png'
import champion from '../assets/champion1.png'
import Brodille from '../assets/Brodille-Regular.ttf'

const Leaderboard = () => {
  // Dummy leaderboard data
  const leaderboardData = [
    { username: 'Player1', score: 100 },
    { username: 'Player2', score: 90 },
    { username: 'Player3', score: 80 },
    { username: 'Player4', score: 70 },
    { username: 'Player5', score: 60 },
    { username: 'Player6', score: 50 },
    { username: 'Player7', score: 40 },
    { username: 'Player8', score: 30 },
    { username: 'Player9', score: 20 },
    { username: 'Player10', score: 10 },
  ];

  // Images for ranks 1, 2, and 3
  const rankImages = [goldmedal,silvermedal,bronzemedal];
  const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32'];

  // Render item for leaderboard list
  const renderLeaderboardItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <View style={[styles.rankContainer,{ backgroundColor: index < 3 ? rankColors[index] : '#AC87C5' }]}>
      {index < 3 ? (
        <Image source={rankImages[index]} style={styles.rankImage} />
      ) : (
        <Text style={styles.rank}>{index + 1}</Text>
      )}
      </View>
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={champion} style={styles.Image2} />
      <FlatList
        data={leaderboardData}
        renderItem={renderLeaderboardItem}
        keyExtractor={(item, index) => index.toString()}
      />
       <Image source={gb1} style={styles.Image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5E5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 5,
  },
  rankImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  Image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop : -60, 
  },
  Image2: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop : -50, 
    marginBottom : -50, 
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  usernameContainer: {
    backgroundColor: '#E0AED0',
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 3.84,
    elevation: 10, // Android only
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily : 'Brodille'
  },
  scoreContainer: {
    backgroundColor: '#FFD0EC',
    width : '20%',
    borderRadius: 8,
    marginLeft: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 3.84,
    elevation: 10, // Android only
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily : 'Brodille'
  },
  rankContainer: {
    backgroundColor: '#AC87C5',
    borderRadius: 8,
    padding: 10,
    width : '15%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 3.84,
    elevation: 10, // Android only
  },
});

export default Leaderboard;
