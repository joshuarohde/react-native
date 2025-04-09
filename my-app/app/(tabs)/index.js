import { Text, View, StyleSheet } from 'react-native';
 import { Link } from 'expo-router'; 

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
 {/* Pass a parameter using a query string */}
 <Link href="/about?special=react" style={styles.button}>
        Go to About (Method 1)
      </Link>

      {/* Pass a parameter using an object */}
      <Link
        href={{
          pathname: "/about",
          params: { special: "expo" },
        }}
        style={styles.button}
      >
        Go to About (Method 2)
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});

