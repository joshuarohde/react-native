import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [selectedCity, setSelectedCity] = useState('Saskatoon');

  const weatherData = [
    { city: 'Saskatoon', temperatureC: 22, condition: 'Sunny' },
    { city: 'Regina', temperatureC: 19, condition: 'Cloudy' },
    { city: 'Prince Albert', temperatureC: 16, condition: 'Rainy' },
  ];

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  const selectedWeather = weatherData.find((data) => data.city === selectedCity);

  const convertTemp = (celsius) => unit === 'C' ? celsius : (celsius * 9) / 5 + 32;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Weather App</Text>

      <ToggleButton unit={unit} onToggle={toggleUnit} />

      <CitySelector
        selectedCity={selectedCity}
        onChange={setSelectedCity}
        cities={weatherData.map((data) => data.city)}
      />

      {selectedWeather ? (
        <WeatherCard weather={selectedWeather} unit={unit} convertTemp={convertTemp} />
      ) : (
        <Text style={styles.loading}>No weather data available</Text>
      )}
    </ScrollView>
  );
}

// Toggle Button Component
function ToggleButton({ unit, onToggle }) {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.toggleButton}>
      <Text style={styles.toggleButtonText}>
        Toggle to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
      </Text>
    </TouchableOpacity>
  );
}

// City Selector Component
function CitySelector({ selectedCity, onChange, cities }) {
  return (
    <View style={styles.selectorContainer}>
      <Text style={styles.label}>Select a city:</Text>
      <Picker
        selectedValue={selectedCity}
        onValueChange={(itemValue) => onChange(itemValue)}
        style={styles.picker}
      >
        {cities.map((city, index) => (
          <Picker.Item key={index} label={city} value={city} />
        ))}
      </Picker>
    </View>
  );
}

// Weather Card Component
function WeatherCard({ weather, unit, convertTemp }) {
  return (
    <View style={styles.weatherCard}>
      <Text style={styles.city}>{weather.city}</Text>
      <Text style={styles.condition}>{weather.condition}</Text>
      <Text style={styles.temperature}>
        {convertTemp(weather.temperatureC)}°{unit}
      </Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  
  container: {
    backgroundColor: '#a7f6a3',
    padding: 30,
    alignItems: 'center',
    flex: 1, // makes sure it fills the screen
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  toggleButton: {
    backgroundColor: '#3fc139',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 20,
  },
  selectorContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  weatherCard: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 8,
    width: 250,
    alignItems: 'center',
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 16,
    color: '#666',
  },
  temperature: {
    fontSize: 18,
    marginTop: 10,
  },
  loading: {
    fontSize: 16,
    color: '#999',
  },
});
