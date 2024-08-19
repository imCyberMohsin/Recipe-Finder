import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import RecipeCard from '../RecipeCard'
import { getRandomColor } from '../../utils/utils'

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;
const Homepage = () => {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log("Recipes: ", recipe);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipe([]);

    try {
      const response = await fetch(`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      const data = await response.json();
      // console.log(data);
      setRecipe(data.hits);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipes('Paneer');
  }, [])

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    fetchRecipes(e.target[0].value);
  }

  return (
    <>
      <div className='bg-[#faf9fb] p-10 flex-1'>
        <div className='max-w-screen-lg mx-auto'>
          <form onSubmit={handleSearchRecipe}>
            <label className='input shadow-md flex items-center gap-2'>
              <Search size={24} />
              <input type="text"
                className='text-sm md:text-md grow'
                placeholder='Search for a recipe'
              />
            </label>
          </form>

          <h1 className='font-bold text-3xl md:text-5xl mt-4'>Recommended Recipes</h1>
          <p className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>Popular Choices</p>

          {/* Card Div */}
          <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {/* Card */}
            {!loading && recipe.map(({ recipe }, index) => (
              <RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
            ))}

            {loading && [...Array(9)].map((_, index) => (
              <div key={index} className="flex w-52 flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div >
    </>
  )
}

export default Homepage