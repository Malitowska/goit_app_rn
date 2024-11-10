//Firebase Authentication
//Задача: дозволити користувачам реєструватися та входити в додаток.

//Приклад використання (JavaScript):

//Підключення Firebase:

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Реєстрація користувача:

function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User registered:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error registering user:", error);
    });
}

//Вхід користувача:

function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error logging in:", error);
    });
}

//Firestore Database
//Задача: зберігати профілі користувачів та дані про їхні пости (наприклад, у соціальній мережі).

//Приклад використання:

//Підключення Firestore:

import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";

const db = getFirestore(app);

//Створення профілю користувача:

async function createUserProfile(userId, profileData) {
  try {
    await setDoc(doc(db, "users", userId), profileData);
    console.log("User profile created");
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
}

// Виклик функції з даними користувача:
createUserProfile("user123", {
  name: "John Doe",
  bio: "Web developer",
});

//Додавання посту:

async function addPost(userId, postContent) {
  try {
    await addDoc(collection(db, "posts"), {
      userId: userId,
      content: postContent,
      timestamp: Date.now(),
    });
    console.log("Post added");
  } catch (error) {
    console.error("Error adding post:", error);
  }
}

//Отримання постів:

async function getAllPosts() {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
    });
  } catch (error) {
    console.error("Error getting posts:", error);
  }
}


////////

//Firebase Storage
//Задача: дозволити користувачам завантажувати зображення профілю.

//Приклад використання:

//Підключення Storage:

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);

//Завантаження зображення профілю:

async function uploadProfileImage(userId, file) {
  const storageRef = ref(storage, `profile_images/${userId}`);

  try {
    await uploadBytes(storageRef, file);
    console.log("Profile image uploaded");
  } catch (error) {
    console.error("Error uploading profile image:", error);
  }
}

//Отримання URL зображення:

async function getProfileImageUrl(userId) {
  const storageRef = ref(storage, `profile_images/${userId}`);

  try {
    const url = await getDownloadURL(storageRef);
    console.log("Profile image URL:", url);
    return url;
  } catch (error) {
    console.error("Error getting profile image URL:", error);
  }
}


//Загальний сценарій використання:
//Authentication: Користувач реєструється або входить у систему.
//Firestore Database: Зберігаються дані користувача, пости, лайки тощо.
//Storage: Користувач завантажує зображення профілю, яке потім зберігається та доступне для відображення в додатку