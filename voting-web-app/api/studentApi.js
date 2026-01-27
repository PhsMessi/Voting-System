const BASE_URL = "http://localhost:3000/api";

export async function registerStudent(data) {
  try {
    const response = await fetch(BASE_URL, "/PostStudent");
  } catch (err) {}
}
