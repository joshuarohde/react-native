import { StyleSheet, Text, View, Image } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

export default function App() {
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.title}>Jeremy Renner Food App</Text>
      </View>

        <View style={styles.recipeCard}>
    <View style={styles.topRow}>
      <Image
        source={require('./assets/chickencurry.jpg')}
        style={styles.imgs}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.recipeTitle}>
          Almond Milk Chicken Curry
        </Text>
        <Text style={styles.creator}>
          by Becky Hardin
        </Text>
        <Text style={styles.descriptions}>
          "This curry’s light, creamy, and packed with comfort. It’s got flavour without the fire, so even my kid loves it. After a long day, this one feels like home."
        </Text>
        <Text style={styles.jeremy}>
          - Jeremy Renner
        </Text>
      </View>
    </View>

    <View style={styles.timeRow}>
      <Text style={styles.timeText}>Prep: 20 mins</Text>
      <Text style={styles.timeText}>Cook: 20 mins</Text>
      <Text style={styles.timeText}>Total: 40 mins</Text>
      <Text style={styles.timeText}>Servings: 4</Text>
    </View>
  </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 24,
  },

  body: {
    flex: 1,
    padding: 16 
  },

  title: {
    fontSize: RFValue(20) 
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  
  recipeCard: {
    flexDirection: 'column', 
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  

imgs: { 
  width: 80, 
  height: 130, 
  borderRadius: 8, 
  marginRight: 12 
},

recipeTitle: { 
  fontSize: 18, 
  fontWeight: '600', 
  marginBottom: 4 },

  creator: {
    fontSize: 14, 
    color: '#555', 
    opacity: 0.7,
    paddingBottom: 5,
  },

descriptions: { 
  fontSize: 14, 
  color: '#555' },

  jeremy: { 
    fontSize: 14, 
    color: '#555', 
  fontWeight: 500,
},

timeRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
},

timeText: {
  fontSize: 12,
  color: '#888',
  flex: 1,
  textAlign: 'center',
},

});
