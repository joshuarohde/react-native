import React, { useState } from 'react';
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
  Alert,
  ImageBackground
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialIcons } from '@expo/vector-icons';

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
      quote: `“This curry’s light, creamy, and packed with comfort.”\n- Jeremy Renner`,
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
      title: 'Spinach Artichoke Dip with Toasted Pitas',
      author: 'Angela G',
      image: require('./assets/spinach-dip.jpg'),
      quote: `“Five ingredients. Big flavour. This creamy dip’s the kind of thing I’d crush after a long shoot! Warm, cheesy, and gone in minutes.”
- Jeremy Renner`,
      time: { prep: '5 mins', cook: '1 hour', total: '1h 5m', servings: '8' },
      ingredients: [
        { type: 'title', label: 'Dip' },
        { type: 'item', label: '11 oz fresh spinach leaves stems removed' },
        { type: 'item', label: '8 oz cream cheese' },
        { type: 'item', label: '½ cup Italian cheese blend (Parmesan, Asiago, Romano)' },
        { type: 'item', label: '13.75 oz artichoke hearts, drained and chopped' },
        { type: 'item', label: '.75 oz Garlic & Herb Dressing & Recipe Seasoning Mix' },
        { type: 'title', label: 'Pitas' },
        { type: 'item', label: '4 Greek pitas' },
        { type: 'item', label: '8 tablespoon salted butter' },
        { type: 'item', label: '1 teaspoon sea salt' },
        { type: 'item', label: '1 teaspoon Italian seasoning' }
      ],
      instructions: [
        'Slice pitas using a pizza cutter or cut with kitchen shears into 8 triangle pieces.',
        'Generously brush both sides or each pita with melted butter, sprinkle with salt and herbs.',
        'Simmer for 30 minutes',
        'Bake or air fry at 400º until light golden brown and crispy (about 3-7 minutes).',
        'Add spinach, cream cheese, Italian cheeses, chopped artichokes and garlic & herb seasoning powder to your crockpot set to high.',
        'Cook for 1 hour, stirring half way through and more as needed to break up the cream cheese and blend everything together',
        'The dip is ready when all ingredients have combined together evenly and are piping hot and bubbling. Turn heat down to keep warm so spinach does not overcook but stay warm for serving.'
      ],
    },

    {
      id: '3',
      title: 'Grilled Pork Kabobs',
      author: 'Camille Beckstrand',
      image: require('./assets/porkkabobs.jpg'),
      quote: `“Each kabob’s like one of Hawkeye’s arrows. They are precise, powerful, and hits you right in the flavour zone. Juicy, smoky, and straight-up legendary.” 
– Jeremy Renner`,
      time: { prep: '4h 20m', cook: '8 mins', total: '1h 28m', servings: '6' },
      ingredients: [
        { type: 'item', label: '½ cup red wine vinegar' },
        { type: 'item', label: '½ cup vegetable oil' },
        { type: 'item', label: '1 large sweet onion, finely chopped' },
        { type: 'item', label: '3 Tablespoons garlic cloves, finely chopped' },
        { type: 'item', label: '2 Tablespoons fresh parsley, finely chopped' },
        { type: 'item', label: '2 pounds pork tenderloin, (cut into 1 inch cubes)' },
        { type: 'item', label: 'salt and pepper, to taste' }
      ],
      instructions: [
        'In a gallon-sized resealable bag, mix together red wine vinegar, vegetable oil, onions, garlic and parsley.',
        'Add pork to bag and marinate in the fridge for at least 4 hours (8-10 hours for maximum flavor).',
        'If using wooden skewers, let soak in water for 30 minutes. Remove pork from marinade and thread onto skewers, packing them tightly. Generously season pork with salt and pepper.',
        'Preheat grill to high heat.',
        'Grill pork for 3-4 minutes on each side or until pork is cooked thoroughly.'
      ],
    },

    {
      id: '4',
      title: 'Italian Stuffed Peppers',
      author: 'Erin Clarke',
      image: require('./assets/peppers.jpg'),
      quote: `“These stuffed peppers? Clean, sharp, and no-nonsense. Kinda like tracking footprints in a snowstorm. Just like Wind River. cold on the outside, heat underneath.” 
– Jeremy Renner`,
      time: { prep: '10 mins', cook: '40 mins', total: '50 mins', servings: '4' },
      ingredients: [
        { type: 'item', label: '4 large red bell peppers' },
        { type: 'item', label: '2 teaspoons extra virgin olive oil' },
        { type: 'item', label: '1 pound ground chicken or turkey' },
        { type: 'item', label: '2 teaspoons Italian seasoning' },
        { type: 'item', label: '½ teaspoon kosher salt' },
        { type: 'item', label: '¼ teaspoon red pepper flakes or up to ½ teaspoon if you like more spicy' },
        { type: 'item', label: '1 can no salt added diced tomatoes with juices, 15 ounces' },
        { type: 'item', label: '1 ½ cups cooked brown rice farro, quinoa, cauliflower rice, or orzo' },
        { type: 'item', label: '1 cup shredded Mozzarella' },
        { type: 'item', label: '½ cup Parmesan' },
        { type: 'item', label: '2 tablespoons chopped fresh basil' },

      ],
      instructions: [
        'Preheat your oven to 375 degrees F. Lightly coat a 9×13-inch baking dish with nonstick spray. Slice the bell peppers in half from top to bottom. Remove the seeds and membranes then arrange cut side up in the prepared baking dish.',
        'Heat the olive oil in a large, nonstick skillet over medium high heat. Add the chicken, Italian seasoning, garlic powder, salt, and red pepper flakes. Cook, breaking apart the meat, until the chicken is browned and cooked through, about 4 minutes. Drain off any excess liquid, then pour in the can of diced tomatoes and their juices. Let simmer for 1 minute.',
        'Remove the pan from the heat. Stir in the rice (or farro) and ½ cup of the Mozzarella and ¼ cup of the parmesan. Mound the filling inside of the peppers, then top with the remaining cheeses.',
        'Pour a bit of water into the pan with the peppers—just enough to barely cover the bottom of the pan. Bake uncovered for 30 to 35 minutes, until the peppers are tender and the cheese is melted. Top with fresh basil. Serve hot.'
      ],
    },


  ];

  const toggleSwitch = () => setSwitchValue(prev => !prev);

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
    setDropdownStates(prev => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        [type]: !prev[cardId]?.[type],
      },
    }));
  };

  const toggleCheckbox = (cardId, type, index) => {
    setCheckboxStates(prev => {
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
        <View style={styles.darkModeCard}>
          <Text style={styles.darkModeTitle}>Enable Jeremy Mode</Text>
          <Switch value={switchValue} onValueChange={toggleSwitch} />
        </View>
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
        <Text style={styles.rennerTitle}>Tell Jeremy What You Think of the Food!</Text>
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
    borderRadius: 12,
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
    marginRight: 20,
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