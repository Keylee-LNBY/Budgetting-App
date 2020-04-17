  
// console.log("Database JS has been Loaded")
//Make the db global
let db;

const request = indexedDB.open("budget", 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = (event) => {
    db = event.target.result;
    // If the App is online connect & read the DB 
    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = (event) => {
    console.log("Oh, no!! There is an error: " + event.target.errorCode);
};

const saveRecord = (record) => {
    // create a transaction 
    const transaction = db.transaction(["pending"], "readwrite");
    // access the object
    const store = transaction.objectStore("pending");
    // store the info 
    store.add(record);
}

const checkDatabase = () => {
  // open a transaction on your pending db
  const transaction = db.transaction(["pending"], "readwrite");
  // access your pending object store
  const store = transaction.objectStore("pending");
  // get all records from store and set to a variable
  const getAll = store.getAll();

    getAll.onsuccess = () => {
        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(() => {
            // create a transaction from the pending db
            const transaction = db.transaction(["pending"], "readwrite");
            // access the stored object
            const store = transaction.objectStore("pending");
            // clear out all pending items
            store.clear();
            });
        }
    };
}

// Check to see if the app is still online
window.addEventListener("online", checkDatabase);