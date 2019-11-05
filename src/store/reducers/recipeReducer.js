import {createReducer} from './reducerUtils';
import {CREATE_RECIPE, UPDATE_RECIPE, DELETE_RECIPE} from '../actions/types'


const initialState = [
  {
    id: "1",
    dishPhotoURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmJGDOe1XwyyMAyCDPldcz_EMS7CTvBnIffwX7tyDY8SlNEMQJ&s",
    title: "Pizza",
    prepTime: "20:00",
    category: "dessert",
    rating: 3,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    ingredients: "1/2 water\n 0.3t.s sugar\n 3l juice",
    directions: "1. put everyting in bowl\n2.boil\n3.ready",
    recipeBy: "Anna",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    likes: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "2",
    dishPhotoURL:
      "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/energy-boosting_foods_for_copd_slideshow/650x350_energy-boosting_foods_for_copd_slideshow.jpg",
    title: "Candies",
    prepTime: "20:00",
    category: "dessert",
    rating: 4,
    description: "Lorem ipsum arcu vehicula ullamcorper.",
    ingredients:
      "1/2 water\n 0.3t.s sugar\n 3l juice\n4.dssfd\n5.dsfsdfdasfdfsdfsdafsdfsdfsd sdfd fsg s ss\n6.fdsaffs",
    directions:
      "1. put everyting in bowl\n2.boil\n3.ready\n4.sdafaaffd sfgsaD\n5.dfs sf sdf",
    recipeBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    likes: [
      {
        id: "c",
        name: "Anna",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "3",
    dishPhotoURL:
      "https://assets3.thrillist.com/v1/image/2797371/size/tmg-article_default_mobile.jpg",
    title: "Pizza",
    prepTime: "20:00",
    category: "dessert",
    rating: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    ingredients: "1/2 water\n 0.3t.s sugar\n 3l juice",
    directions: "1. put everyting in bowl\n2.boil\n3.ready",
    recipeBy: "Anna",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/42.jpg",
    likes: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "4",
    dishPhotoURL:
      "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/article/2017/12/06/why-sugar-and-why-so-much-who-investigates-the-food-industry-s-sweet-tooth/7624387-1-eng-GB/Why-sugar-and-why-so-much-WHO-investigates-the-food-industry-s-sweet-tooth_wrbm_large.jpg",
    title: "Candies",
    prepTime: "20:00",
    category: "dessert",
    rating: 0,
    description: "Lorem ipsum arcu vehicula ullamcorper.",
    ingredients:
      "1/2 water\n 0.3t.s sugar\n 3l juice\n4.dssfd\n5.dsfsdfdasfdfsdfsdafsdfsdfsd sdfd fsg s ss\n6.fdsaffs",
    directions:
      "1. put everyting in bowl\n2.boil\n3.ready\n4.sdafaaffd sfgsaD\n5.dfs sf sdf",
    recipeBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    likes: [
      {
        id: "c",
        name: "Anna",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  }
];

const createRecipe = (state, payload) => {
  return [...state, payload.recipe];
};

const updateRecipe = (state, payload) => {
  return [
    ...state.filter(recipe => recipe.id !== payload.recipe.id),
    payload.recipe
  ];
};

const deleteRecipe = (state, payload) => {

    return [
      ...state.filter(recipe => recipe.id !== payload.recipeId) 
    ];
  };

  export default createReducer(initialState, {
      [CREATE_RECIPE]: createRecipe,
      [UPDATE_RECIPE]: updateRecipe,
      [DELETE_RECIPE]: deleteRecipe
  });
