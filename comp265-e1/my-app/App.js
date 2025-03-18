import React, { useState } from 'react';
import { View, Text, Button, Picker, StyleSheet, SafeAreaView } from 'react-native';

function WeatherApp() {
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [selectedCity, setSelectedCity] = useState('Saskatoon'); // Default city

  // Static weather data
  const weatherData = [
    { city: 'Saskatoon', temperatureC: 22, condition: 'Sunny' },
    { city: 'Regina', temperatureC: 19, condition: 'Cloudy' },
    { city: 'Prince Albert', temperatureC: 16, condition: 'Rainy' },
  ];

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  const convertTemperature = (tempC) => {
    return unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  };

  const selectedWeather = weatherData.find((data) => data.city === selectedCity);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Weather App</Text>
      
      <Button title={`Toggle to ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`} onPress={toggleUnit} />
      
      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Select a city:</Text>
        <Picker
          selectedValue={selectedCity}
          onValueChange={(itemValue) => setSelectedCity(itemValue)}
          style={styles.picker}
        >
          {weatherData.map((data, index) => (
            <Picker.Item key={index} label={data.city} value={data.city} />
          ))}
        </Picker>
      </View>

      {selectedWeather ? (
        <View style={styles.weatherCard}>
          <Text style={styles.city}>{selectedWeather.city}</Text>
          <Text style={styles.condition}>{selectedWeather.condition}</Text>
          <Text style={styles.temperature}>
            {convertTemperature(selectedWeather.temperatureC)}°{unit}
          </Text>
        </View>
      ) : (
        <Text style={styles.loading}>No weather data available</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectorContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    width: 200,
    height: 50,
  },
  weatherCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    width: 200,
    alignItems: 'center',
  },
  city: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 16,
    color: '#555',
  },
  temperature: {
    fontSize: 18,
    color: '#333',
  },
  loading: {
    fontSize: 16,
    color: '#999',
  },
});

export default WeatherApp;
