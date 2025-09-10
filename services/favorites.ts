import api from "./api";

async function getFavorites() {
  try {
    const response = await api.get("/");
    if (!response.data) console.log("no data");
    return response.data;
  } catch (err) {
    console.error("Bilinmedik bir hata");
  }
}

async function addFavorites(meal: {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}) {
  try {
    const response = await api.post("/add", meal);
    console.log("Favori eklendi:", response.data);
  } catch (err) {
    console.error("Favori ekleme hatası", err);
  }
}

async function deleteFavorites(favoriteId: string) {
  try {
    const response = await api.delete(`/${favoriteId}`);
    console.log("Favori silindi:", response.data);
  } catch (err) {
    console.error("Favori silme hatası:", err);
  }
}
