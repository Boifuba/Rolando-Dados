const admin = require("firebase-admin");
const fs = require("fs");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

async function backup() {
  let data = {};
  const collections = await db.listCollections();
  for (let collection of collections) {
    const snapshot = await db.collection(collection.id).get();
    data[collection.id] = snapshot.docs.map((doc) => doc.data());
  }
  fs.writeFileSync("backup.json", JSON.stringify(data));
}

backup();
