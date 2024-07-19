const fs = require('fs');
const path = require('path');

let items = [];
let categories = [];

function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/items.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            items = JSON.parse(data);

            fs.readFile('./data/categories.json', 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                categories = JSON.parse(data);
                resolve();
            });
        });
    });
}

function getAllItems() {
    return new Promise((resolve, reject) => {
        if (items.length === 0) {
            reject('No items found');
            return;
        }

        resolve(items);
    });
}

function getPublishedItems() {
    return new Promise((resolve, reject) => {
        const publishedItems = items.filter(item => item.published);

        if (publishedItems.length === 0) {
            reject('No published items found');
            return;
        }

        resolve(publishedItems);
    });
}

function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject('No categories found');
            return;
        }

        resolve(categories);
    });
}

function addItem(item) {
    return new Promise((resolve, reject) => {
        item.id = items.length + 1;
        items.push(item);

        fs.writeFile('./data/items.json', JSON.stringify(items, null, 4), 'utf8', (err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
}

module.exports = {
    initialize,
    getAllItems,
    getPublishedItems,
    getCategories,
    addItem,
};
