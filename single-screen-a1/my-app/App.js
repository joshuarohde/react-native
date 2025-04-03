import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Switch,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  Alert
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialIcons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [switchValue, setSwitchValue] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedCards, setExpandedCards] = useState({});
  const [dropdownStates, setDropdownStates] = useState({});
  const [checkboxStates, setCheckboxStates] = useState({});

  const recipes = [
    {
      id: '1',
      title: 'Almond Milk Chicken Curry',
      author: 'Becky Hardin',
      image: require('./assets/chickencurry.jpg'),
      quote: '“This curry’s light, creamy, and packed with comfort.”',
      time: { prep: '20 mins', cook: '20 mins', total: '40 mins', servings: '4' },
      ingredients: [
        { type: 'title', label: 'Curry Paste' },
        { type: 'item', label: '1 onion chopped' },
        { type: 'item', label: '2 cloves garlic' },
        { type: 'title', label: 'Main Ingredients' },
        { type: 'item', label: '2 chicken breasts' },
        { type: 'item', label: '1 cup almond milk' },
      ],
      instructions: [
        'Chop the onion and garlic.',
        'Blend curry paste ingredients.',
        'Cook chicken and add sauce.',
        'Simmer and serve with rice.',
      ],
    },
    {
      id: '2',
      title: 'Renner Ranch Beans',
      author: 'Jeremy Renner',
      image: require('./assets/chickencurry.jpg'),
      quote: `“A hearty dish for a heroic day.”
- Jeremy Renner`,
      time: { prep: '10 mins', cook: '30 mins', total: '40 mins', servings: '6' },
      ingredients: [
        { type: 'title', label: 'Beans Section' },
        { type: 'item', label: '2 cans of beans' },
        { type: 'item', label: '1 onion, chopped' },
        { type: 'title', label: 'Seasoning' },
        { type: 'item', label: 'BBQ sauce' },
        { type: 'item', label: 'Salt, pepper, paprika' }
      ],
      instructions: [
        'Sauté onions',
        'Add beans and sauce',
        'Simmer for 30 minutes',
        'Serve hot',
      ],
    },
  ];

  const toggleSwitch = () => setSwitchValue(previous => !previous);

  const handleSendMessage = () => {
    if (message.trim()) {
      Alert.alert('Message sent', 'Thanks for telling Jeremy what you think!');
      setMessage('');
    } else {
      Alert.alert('Empty message', 'Please type something before sending.');
    }
  };

  const toggleCard = (cardId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCards({ [cardId]: true });
  };

  const toggleDropdown = (cardId, type) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDropdownStates((prev) => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        [type]: !prev[cardId]?.[type],
      },
    }));
  };

  const toggleCheckbox = (cardId, type, index) => {
    setCheckboxStates((prev) => {
      const current = prev?.[cardId]?.[type] || {};
      return {
        ...prev,
        [cardId]: {
          ...prev[cardId],
          [type]: {
            ...current,
            [index]: !current[index],
          },
        },
      };
    });
  };

  const renderListItem = (item, index, cardId, type) => {
    if (item.type === 'title') {
      return (
        <TouchableWithoutFeedback key={index} onPress={() => toggleDropdown(cardId, type)}>
          <Text style={styles.subSectionTitle}>{item.label}</Text>
        </TouchableWithoutFeedback>
      );
    }

    const checked = checkboxStates?.[cardId]?.[type]?.[index];
    return (
      <TouchableWithoutFeedback key={index} onPress={() => toggleDropdown(cardId, type)}>
        <View style={styles.listItem}>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              toggleCheckbox(cardId, type, index);
            }}
          >
            <MaterialIcons
              name={checked ? 'check-box' : 'check-box-outline-blank'}
              size={20}
              color={checked ? 'green' : '#aaa'}
            />
          </TouchableOpacity>
          <Text style={[styles.itemText, checked && { opacity: 0.6 }]}>{item.label}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const appContent = (
    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.container}>
        <Text style={styles.title}>Jeremy Renner Food App</Text>
      </View>
<View style={styles.darkModeCard}>
          <Text style={styles.darkModeTitle}>Enable Jeremy Mode</Text>
          <Switch value={switchValue} onValueChange={toggleSwitch} />
        </View>
      {recipes.map((recipe) => (
        <TouchableWithoutFeedback key={recipe.id} onPress={() => toggleCard(recipe.id)}>
          <View style={styles.recipeCard}>
            <View style={styles.topRow}>
              <Image source={recipe.image} style={styles.imgs} />
              <View style={{ flex: 1 }}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.creator}>by {recipe.author}</Text>
                <Text style={styles.descriptions}>{recipe.quote}</Text>
              </View>
            </View>

            <View style={styles.timeRow}>
              <Text style={styles.timeText}>Prep: {recipe.time.prep}</Text>
              <Text style={styles.timeText}>Cook: {recipe.time.cook}</Text>
              <Text style={styles.timeText}>Total: {recipe.time.total}</Text>
              <Text style={styles.timeText}>Servings: {recipe.time.servings}</Text>
            </View>

            {expandedCards[recipe.id] && (
              <>
                <TouchableWithoutFeedback onPress={() => toggleDropdown(recipe.id, 'ingredients')}>
                  <View style={styles.dropdownHeader}>
                    <Text style={styles.dropdownTitle}>Ingredients</Text>
                    <MaterialIcons
                      name={dropdownStates?.[recipe.id]?.ingredients ? 'expand-less' : 'expand-more'}
                      size={24}
                      color="#444"
                    />
                  </View>
                </TouchableWithoutFeedback>
                {dropdownStates?.[recipe.id]?.ingredients &&
                  recipe.ingredients.map((item, index) =>
                    renderListItem(item, index, recipe.id, 'ingredients')
                  )}

                <TouchableWithoutFeedback onPress={() => toggleDropdown(recipe.id, 'instructions')}>
                  <View style={styles.dropdownHeader}>
                    <Text style={styles.dropdownTitle}>Instructions</Text>
                    <MaterialIcons
                      name={dropdownStates?.[recipe.id]?.instructions ? 'expand-less' : 'expand-more'}
                      size={24}
                      color="#444"
                    />
                  </View>
                </TouchableWithoutFeedback>
                {dropdownStates?.[recipe.id]?.instructions &&
                  recipe.instructions.map((item, index) =>
                    renderListItem({ type: 'item', label: item }, index, recipe.id, 'instructions')
                  )}
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      ))}

      <View style={styles.rennerMessageBox}>
        <Text style={styles.rennerTitle}>Tell Jeremy Renner What You Think Of The Food!</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <Button title="Send Message" onPress={handleSendMessage} />
      </View>
    </ScrollView>
  );

  return switchValue ? (
    <ImageBackground
      source={require('./assets/jeremy.jpg')}
      style={styles.backgroundImage}
      resizeMode="repeat"
    >
      {appContent}
    </ImageBackground>
  ) : (
    appContent
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    margin: 24,
    backgroundColor: '#fff',
    marginTop: 60,
  },
  body: {
    flexGrow: 1,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imgs: {
    width: 80,
    height: 130,
    borderRadius: 8,
    marginRight: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  creator: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  descriptions: {
    fontSize: 13,
    color: '#555',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    marginTop: 10,
  },
  timeText: {
    fontSize: 12,
    color: '#888',
    flex: 1,
    textAlign: 'center',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 10,
  },
  dropdownTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  itemText: {
    fontSize: 13,
    marginLeft: 10,
    color: '#333',
  },
  subSectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 8,
  },
  rennerMessageBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  rennerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  darkModeCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  darkModeTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },  
});
