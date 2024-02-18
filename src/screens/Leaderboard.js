import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import goldmedal from '../assets/goldmedal.png'
import silvermedal from '../assets/silvermedal.png'
import bronzemedal from '../assets/bronzemedal.png'
import gb1 from '../assets/gb1.png'
import champion from '../assets/champion1.png'
import Brodille from '../assets/Brodille-Regular.ttf'
import axios from 'axios';

const Leaderboard = ({ route }) => {
  const { token, username } = route.params;
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/game/leaderboard/${username}`, {
        headers: {
          Authorization : `Bearer ${token}`,
          'Content-type' : 'application/json'
      }
      });

      // if (!response.ok) {
      //   throw new Error('Failed to fetch leaderboard data');
      // }

      const data = response.data;
      console.log("data", data);

      setLeaderboardData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      setError(error.message);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const rankImages = [goldmedal, silvermedal, bronzemedal];
  const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32'];

  const renderLeaderboardItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <View style={[styles.rankContainer, { backgroundColor: index < 3 ? rankColors[index] : '#AC87C5' }]}>
        {index < 3 ? (
          <Image source={rankImages[index]} style={styles.rankImage} />
        ) : (
          <Text style={styles.rank}>{index + 1}</Text>
        )}
      </View>
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{item.name}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{item.userWins}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>Failed to load leaderboard data. Please try again later.</Text>
        <TouchableOpacity onPress={fetchLeaderboardData} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
  loadingContainer: {
    justifyContent: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
  // rest of your styles remain the same
});

export default Leaderboard;
