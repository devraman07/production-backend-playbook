import crypto from "crypto";
import { hotels } from "../../../database/hotels.js";

export const createHotels = ({
  name,
  city,
  price,
  rating,
  location,
  availableRooms,
  createdBy,
}) => {
  try {
    const newHotel = {
      id: crypto.randomUUID(),
      name: name,
      city: city,
      price: price,
      rating: rating,
      location: location,
      availableRooms: availableRooms,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy,
    };

    hotels.push(newHotel);

    return {
      success: true,
      message: "Hotel created successfully",
      data: newHotel,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error creating hotel",
      data: null,
    };
  }
};

export const getHotels = ({
  search,
  city,
  sort,
  rating,
  page = 1,
  limit = 5,
}) => {
  try {
    let result = [...hotels];

    // Search
    if (search) {
      result = result.filter((hotel) =>
        hotel.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // City Filter
    if (city) {
      result = result.filter(
        (hotel) => hotel.city.toLowerCase() === city.toLowerCase(),
      );
    }

    // Rating Filter
    if (rating) {
      result = result.filter((hotel) => hotel.rating >= rating);
    }

    //sorting
    if (sort == "price_asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort == "price_desc") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating_asc") {
      result.sort((a, b) => a.rating - b.rating);
    }

    if (sort === "rating_desc") {
      result.sort((a, b) => b.rating - a.rating);
    }

    const total = result.length;

    const skip = (page - 1) * limit;

    const paginatedHotels = result.slice(skip, skip + limit);

    return {
      success: true,
      total,
      page,
      limit,
      data: paginatedHotels,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const getHotelById = (id) => {
  const hotel = hotels.find((hotel) => hotel.id === id);

  if (!hotel) {
    return {
      success: false,
      message: "Hotel not found",
    };
  }

  return {
    success: true,
    data: hotel,
  };
};
