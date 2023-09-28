import { ArrayModel } from "../store/models/rsm-entity.model";
 
 export const generateRandomObject = () => {
  const id = Math.floor(Math.random() * 1000); // Generate a random ID between 0 and 1000
  const nameLength = Math.floor(Math.random() * 5) + 1; // Generate a random name length between 1 and 5 characters
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let name = '';

  // Generate a random name with the specified length
  for (let i = 0; i < nameLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    name += characters.charAt(randomIndex);
  }

  // Create and return the object
  const randomObject: ArrayModel = {
    id: id,
    name: name,
  };

  return randomObject;
}
