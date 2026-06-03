export const hotelTransformer = (req, res, next) => {
  if (req.body.name) {
    req.body.name = req.body.name.trim();
  }

  if (req.body.city) {
    req.body.city = req.body.city.trim();
  }

  if (req.body.price) {
    req.body.price = Number(req.body.price);
  }

  if (req.body.rating) {
    req.body.rating = Number(req.body.rating);
  }

  if (req.body.availableRooms) {
    req.body.availableRooms = Number(req.body.availableRooms);
  }

  next();
};
