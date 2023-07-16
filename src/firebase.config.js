import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCO3lVWGys-Z78NRjAdGuYisYOC3LX7S0o",
  authDomain: "firebnb-c2a2b.firebaseapp.com",
  projectId: "firebnb-c2a2b",
  storageBucket: "firebnb-c2a2b.appspot.com",
  messagingSenderId: "569573065026",
  appId: "1:569573065026:web:7e79ea8023890ff45548db"
};

initializeApp(firebaseConfig);

export const db = getFirestore();