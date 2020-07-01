import Dexie from "dexie";

export const initialization = () => {
    const db = new Dexie("Menu");
    db.version(1).stores({
        basicMenu: "MenuParams",
        masterMenu: "MenuParams",
        modulesMenu: "MenuParams",
    });
}
db.version(1).stores({
    friends: "id",
});
db.friends.bulkPut([{id:1},{id:2},{id:3}],{allKeys: true}).then(ar => {
    db.friends.bulkGet(ar)
    .then(va => {
        console.log(va)
    })
})
db.friends.toCollection().keys(key => {
    console.log(key)
})
