import { StyleSheet, Text, View, Image } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

export default function App() {
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.title}>Jeremy Renner Food App</Text>
      </View>

      <View style={styles.recipeCard}>
        <Image
          source={{ uri: 'https://placekitten.com/201/200' }}
          style={styles.imgs}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 4 }}>
            Mr. Fluffles
          </Text>
          <Text style={{ fontSize: 14, color: '#555' }}>
            CEO of naps. CFO of chaos.
          </Text>
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
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center'
  },
imgs: { 
  width: 80, 
  height: 80, 
  borderRadius: 8, 
  marginRight: 12 
},

});
