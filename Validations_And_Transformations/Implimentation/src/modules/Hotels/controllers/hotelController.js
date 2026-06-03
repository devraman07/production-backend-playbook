import {
  createHotels,
  getHotelById,
  getHotels,
} from "../services/hotelservice.js";

export const createNewHotel = (req, res) => {
  try {
    const result = createHotels({
      ...req.body,
      createdBy: req.user.id,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating hotel",
      data: null,
    });
  }
};

export const getAllHotels = (req, res) => {
  try {
    const result = getHotels(req.query);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      total: result.total,
      page: result.page,
      limit: result.limit,
      count: result.data.length,
      data: result.data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSingleHotel = (req, res) => {
  try {
    const result = getHotelById(req.params.id);
    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
