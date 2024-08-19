import React, { useState, useEffect } from 'react';
import { Heart, HeartPulse, Soup } from 'lucide-react';

const getTwoValuesFromArray = (arr) => {
    return arr.slice(0, 2);
}

const RecipeCard = ({ recipe, bg, badge }) => {
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        setIsFavourite(favourites.some((fav) => fav.label === recipe.label));
    }, [recipe.label]);

    const addRecipeToFavourites = () => {
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        const isRecipeAlreadyInFavourite = favourites.some((fav) => fav.label === recipe.label);

        if (isRecipeAlreadyInFavourite) {
            favourites = favourites.filter((fav) => fav.label !== recipe.label);
            setIsFavourite(false);
        } else {
            favourites.push(recipe);
            setIsFavourite(true);
        }

        localStorage.setItem('favourites', JSON.stringify(favourites));
    }

    return (
        <div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}>
            <a target='_blank' href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`} className='relative h-32'>

                {/* Smoothly load images */}
                <div className='skeleton absolute inset-0'></div>
                <img src={recipe.image}
                    alt="recipe img"
                    className='rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500'
                    onLoad={(e) => {
                        e.currentTarget.style.opacity = 1;
                        e.currentTarget.previousElementSibling.style.display = 'none';
                    }}
                />

                <div className='absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm'>
                    <Soup size={16} /> {recipe.yield} Servings
                </div>

                <div
                    className='absolute top-2 right-2 bg-white p-1 rounded-full cursor-pointer'
                    onClick={(e) => {
                        e.preventDefault();
                        addRecipeToFavourites();
                    }}
                >
                    <Heart size={16} className={isFavourite ? 'text-red-500 fill-red-500' : ''} />
                </div>
            </a>

            <div className='flex mt-1'>
                <p className='font-bold tracking-wide'>{recipe.label}</p>
            </div>

            <p className='my-2'>
                {recipe.cuisineType[0].charAt(0).toUpperCase() + recipe.cuisineType[0].slice(1)}-Kitchen
            </p>

            <div className='flex gap-2 mt-auto'>
                {getTwoValuesFromArray(recipe.healthLabels).map((label, index) => (
                    <div key={index} className={`flex gap-1 ${badge} items-center p-1 rounded-md`}>
                        <HeartPulse size={16} />
                        <span className='text-sm tracking-tighter font-semibold'>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeCard;