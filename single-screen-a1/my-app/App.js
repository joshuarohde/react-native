import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialIcons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const recipes = [
    {
      id: '1',
      // https://www.thecookierookie.com/healthy-almond-milk-chicken-curry-recipe-dairy-free/
      title: 'Almond Milk Chicken Curry',
      author: 'Becky Hardin',
      image: require('./assets/chickencurry.jpg'),
      quote:
        '"This curry’s light, creamy, and packed with comfort. It’s got flavour without the fire, so even my kid loves it. After a long day, this one feels like home."',
      time: { prep: '20 mins', cook: '20 mins', total: '40 mins', servings: '4' },
      ingredients: [
        { type: 'title', label: 'For Curry Paste' },
        { type: 'item', label: '1 onion chopped' },
        { type: 'item', label: '2 cloves garlic' },
        { type: 'item', label: '1 teaspoon ground ginger' },
        { type: 'item', label: '1/2 teaspoon ground tumeric' },
        { type: 'item', label: '1 teaspoon ground cardamom' },
        { type: 'item', label: '1 teaspoon garam masala' },
        { type: 'item', label: '11 teaspoon course sea salt' },


        { type: 'title', label: 'For Almond Milk Chicken Curry' },
        { type: 'item', label: '1 tablespoon olive oil divided' },
        { type: 'item', label: '2 pounds chicken breast cut into 1 inch cubes' },
        { type: 'item', label: 'Salt and pepper to taste' },
        { type: 'item', label: 'Curry paste see recipe below' },
        { type: 'item', label: '6 ounces tomato paste 1 small can' },
        { type: 'item', label: '1.75 cups almondmilk' },
        { type: 'item', label: '1/2 teaspoon ground cinnamon' },
        { type: 'item', label: '1 teaspoon chili powder' },
        { type: 'item', label: 'white rice for serving' },
        { type: 'item', label: 'cilantro for serving optional' }


      ],
      instructions: ['Place the curry paste ingredients in a food processor and pulse until smooth and combined. Set aside.', 
        'Heat 1/2 tablespoon olive oil in a large saucepan over high heat. Add the chicken and season with salt and pepper to taste. Cook for 3-5 minutes, stirring as you cook. Once golden, remove and set aside.', 
        'Add remaining 1/2 tablespoon olive oil to the saucepan and add curry paste. Stir to combine. Cook for 2 minutes or until fragrant.', 
        'Add the tomato paste, almond milk, ground cinnamon, and chili powder. Stir to combine.',
        'Return the chicken to the saucepan and stir to coat.',
        'Reduce heat to medium/low and cook for 30 minutes or until thickened and chicken is fully cooked.',
        'Serve with white rice and top with cilantro. Enjoy!'
      ],
    },
    {
      id: '2',
      title: 'Renner Ranch Beans',
      author: 'Jeremy Renner',
      image: require('./assets/chickencurry.jpg'),
      quote: '"A hearty dish for when you’ve had a heroic day. Easy to make. Hard to forget."',
      time: { prep: '10 mins', cook: '30 mins', total: '40 mins', servings: '6' },
      ingredients: [
        { type: 'title', label: 'Beans Section' },
        { type: 'item', label: '2 cans of beans' },
        { type: 'item', label: '1 onion, chopped' },
        { type: 'title', label: 'Seasoning' },
        { type: 'item', label: 'BBQ sauce' },
        { type: 'item', label: 'Salt, pepper, paprika' }
      ],
      instructions: ['Sauté onions', 'Add beans and sauce', 'Simmer for 30 minutes', 'Serve hot'],
    },
  ];

  const [expandedCards, setExpandedCards] = useState({});
  const [dropdownStates, setDropdownStates] = useState({});
  const [checkboxStates, setCheckboxStates] = useState({});

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
        <Text style={styles.subSectionTitle} key={index}>{item.label}</Text>
      );
    }
  
    const checked = checkboxStates?.[cardId]?.[type]?.[index];
  
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => toggleDropdown(cardId, type)} // tap anywhere else = close
      >
        <View style={styles.listItem}>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation(); // prevent closing if checkbox tapped
              toggleCheckbox(cardId, type, index);
            }}
          >
            <MaterialIcons
              name={checked ? 'check-box' : 'check-box-outline-blank'}
              size={20}
              color={checked ? 'green' : '#aaa'}
            />
          </TouchableOpacity>
          <Text style={[styles.itemText, checked && { opacity: 0.6 }]}>
            {item.label}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  

  return (
    <ScrollView style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.title}>Jeremy Renner Food App</Text>
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
                <Text style={styles.jeremy}>- Jeremy Renner</Text>
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
                    renderListItem(
                      { type: 'item', label: item },
                      index,
                      recipe.id,
                      'instructions'
                    )
                  )}
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 24,
  },
  body: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
  },
  recipeCard: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgs: {
    width: 80,
    height: 130,
    borderRadius: 8,
    marginRight: 12,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  creator: {
    fontSize: 14,
    color: '#555',
    opacity: 0.7,
    paddingBottom: 5,
  },
  descriptions: {
    fontSize: 14,
    color: '#555',
  },
  jeremy: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 10,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemText: {
    fontSize: 14,
    marginLeft: 10,
    marginRight: 20,
    color: '#333',
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 10,
  },
});
